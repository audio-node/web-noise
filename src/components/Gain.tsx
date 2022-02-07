import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

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

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(1);
  const [gain, setGain] = useState(1);

  useEffect(() => {
    console.log("gain rendered", id);
    module[id] = gainNode;
  }, []);

  useEffect(() => {
    gainNode.gain.gain.setValueAtTime(gain, audioContext.currentTime);
  }, [gain]);

  return (
    <>
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
      <div className="dragHandle">gain</div>
      <input
        type="range"
        value={gain}
        ref={inputRange}
        min={min}
        max={max}
        step={0.001}
        onChange={({ target: { value } }) => setGain(+value)}
      />

      <div style={{ display: `flex` }}>
        <label style={{ padding: `0.5em` }}>
          min:
          <input
            style={{ width: `90%` }}
            type="number"
            value={min}
            onChange={({ target: { value } }) => setMin(+value)}
          />
        </label>

        <label style={{ padding: `0.5em` }}>
          max:
          <input
            style={{ width: `90%` }}
            type="number"
            value={max}
            onChange={({ target: { value } }) => setMax(+value)}
          />
        </label>
      </div>

      <Handle
        type="source"
        id="out"
        position={sourcePosition || Position.Right}
      />
    </>
  );
};

export default Gain;
