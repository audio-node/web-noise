import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const DEFAULT_FREQUENCY = 440;

const Oscillator = ({ sourcePosition, id }: NodeProps) => {
  const { device, audioContext } = useEditorContext();

  const oscillator = useMemo(() => {
    return audioContext.createOscillator();
  }, []);

  useEffect(() => {
    oscillator.start();
    device.addNode(id, oscillator);
  }, []);

  const { maxValue, minValue } = oscillator.frequency;
  const [frequency, setFrequency] = useState<number>(DEFAULT_FREQUENCY);

  useEffect(() => {
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  }, [frequency]);

  const radioName = `radio-${+new Date()}`;
  return (
    <>
      <div>oscillating</div>
      <Handle
        type="source"
        position={sourcePosition || Position.Right}
        id="oscillator-out"
      />
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
    </>
  );
};

export default Oscillator;
