/* A convolution reverb */
import { useEffect, useState, VoidFunctionComponent } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { LevaPanel, useControls, useCreateStore } from "leva";

import { useModule, useNode } from "../../ModuleContext";
import { Reverb as TReverb } from "../../nodes";
// @ts-expect-error
import reverbImpulse from "./impulse.wav";

const Reverb: VoidFunctionComponent<NodeProps> = ({
  id,
  data,
  sourcePosition,
  targetPosition,
}) => {
  const { audioContext } = useModule();
  const [impulseBuffer, setImpulseBuffer] = useState<AudioBuffer>();
  // const reverb = useReverb(audioContext, impulseBuffer);
  const { node: reverb } = useNode<TReverb>(id);
  const store = useCreateStore();

  useEffect(() => {
    //TODO: maybe makes sense to move to audio node?
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

    reverb.dryGain.gain.setValueAtTime(0.5, audioContext.currentTime);
    reverb.wetGain.gain.setValueAtTime(0.5, audioContext.currentTime);
  }, [reverb, id, audioContext]);

  useEffect(() => {
    if (!reverb) return;

    reverb.wetGain.gain.setValueAtTime(
      controls.wetDry,
      audioContext.currentTime
    );
    reverb.dryGain.gain.setValueAtTime(
      1 - controls.wetDry,
      audioContext.currentTime
    );
  }, [controls.wetDry, reverb, audioContext]);

  useEffect(() => {
    if (!reverb) return;

    reverb.convolver.buffer = impulseBuffer ?? null;
  }, [reverb, impulseBuffer]);

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
