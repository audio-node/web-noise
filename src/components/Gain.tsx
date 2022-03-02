import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useControls, useCreateStore, LevaPanel, levaStore } from "leva";

const useGain = (audioContext: AudioContext) =>
  useMemo(() => {
    const gain = audioContext.createGain();
    return {
      inputs: {
        in: {
          port: gain,
        },
        gain: {
          port: gain.gain,
        },
      },
      outputs: {
        out: {
          port: gain,
        },
      },
      gain,
    };
  }, [audioContext]);

const Gain = ({ targetPosition, sourcePosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const inputRange = useRef<HTMLInputElement>(null);

  const gainNode = useGain(audioContext);
  const levaStore = useCreateStore();

  const controls = useControls(
    {
      gain: {
        value: 1,
        min: 0,
        max: 1,
        label: "lev",
      },
    },
    { store: levaStore }
  );

  const [gain, setGain] = useState(1);

  useEffect(() => {
    console.log("gain rendered", id);
    module[id] = gainNode;
  }, []);

  useEffect(() => {
    gainNode.gain.gain.setValueAtTime(controls.gain, audioContext.currentTime);
  }, [controls.gain]);

  return (
    <>
      <LevaPanel
        store={levaStore}
        fill
        flat
        titleBar={{ drag: false, title: data.label }}
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        style={{ top: 10 }}
        id="in"
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="gain"
      />

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default Gain;
