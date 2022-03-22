/* A convolution reverb */
import { useEffect, useState, VoidFunctionComponent } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { LevaPanel, useControls, useCreateStore } from "leva";

import { useModule } from "../../ModuleContext";
import useReverb from "./useReverb";
// @ts-expect-error
import reverbImpulse from "./impulse.wav";

const Reverb: VoidFunctionComponent<NodeProps> = ({
  id,
  data,
  sourcePosition,
  targetPosition,
}) => {
  const { audioContext, registerNode, unregisterNode } = useModule();
  const [impulseBuffer, setImpulseBuffer] = useState<AudioBuffer>();
  const reverb = useReverb(audioContext, impulseBuffer);
  const store = useCreateStore();

  useEffect(() => {
    loadImpulse(audioContext).then(setImpulseBuffer);
  }, [audioContext]);

  const controls = useControls(
    {
      wetDry: {
        value: 0.5,
        max: 1,
        min: 0,
        label: "wet/dry",
      },
    },
    { store }
  );

  useEffect(() => {
    if (!reverb) return;

    registerNode(id, reverb);

    reverb.dryGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    reverb.wetGain.gain.setValueAtTime(0.5, audioContext.currentTime);

    return () => {
      unregisterNode(id);
    };
  }, [reverb, id, audioContext]);

  useEffect(() => {
    reverb.wetGain.gain.setValueAtTime(
      controls.wetDry,
      audioContext.currentTime
    );
    reverb.dryGain.gain.setValueAtTime(
      1 - controls.wetDry,
      audioContext.currentTime
    );
  }, [controls.wetDry, reverb, audioContext]);

  return (
    <>
      <LevaPanel
        store={store}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="out"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Reverb;

const loadImpulse = async (audioContext: AudioContext) => {
  const response = await fetch(reverbImpulse);
  const buffer = await response.arrayBuffer();

  return audioContext.decodeAudioData(buffer);
};
