import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const DEFAULT_FREQUENCY = 440;

const useOscillator = (audioContext: AudioContext) =>
  useMemo(() => {
    const oscillator = audioContext.createOscillator();
    return {
      outputs: {
        out: {
          port: oscillator,
        },
      },
      oscillator,
    };
  }, []);

const Oscillator = ({ sourcePosition, id, data }: NodeProps) => {
  const { audioContext, module } = useEditorContext();

  const oscillatorNode = useOscillator(audioContext);
  const { oscillator } = oscillatorNode;

  useEffect(() => {
    oscillator.start();
    module[id] = oscillatorNode;
  }, []);

  const { maxValue, minValue } = oscillator.frequency;
  const [frequency, setFrequency] = useState<number>(DEFAULT_FREQUENCY);

  useEffect(() => {
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  }, [frequency]);

  const radioName = `radio-${+new Date()}`;
  return (
    <>
      <div>{data.label || "oscillator"}</div>
      <div>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "sine")}
          />
          ∿
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "square")}
          />
          ⎍
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "triangle")}
          />
          ⋀
        </label>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "sawtooth")}
          />
          ⊿
        </label>
      </div>
      <div>
        frequency:
        {
          <input
            type="number"
            min={minValue}
            max={maxValue}
            value={frequency}
            onChange={({ target: { value } }) => setFrequency(+value)}
          />
        }
      </div>
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="out"
      />
    </>
  );
};

export default Oscillator;
