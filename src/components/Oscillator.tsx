import { useEffect, useMemo, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";
import { useControls, folder, button, monitor, Leva } from "leva";

const DEFAULT_FREQUENCY = 440;

const useOscillator = (audioContext: AudioContext) =>
  useMemo(() => {
    const oscillator = audioContext.createOscillator();
    return {
      inputs: {
        frequency: {
          port: oscillator.frequency,
        },
        detune: {
          port: oscillator.detune,
        },
      },
      outputs: {
        out: {
          port: oscillator,
        },
      },
      oscillator,
    };
  }, [audioContext]);

const Oscillator = ({
  sourcePosition,
  targetPosition,
  id,
  data,
}: NodeProps) => {
  const { audioContext, module } = useEditorContext();

  const oscillatorNode = useOscillator(audioContext);
  const { myValue } = useControls({ myValue: 10 });

  const values = useControls({
    string: { value: "hello", label: "My string" },
    color: { value: "#f00", label: "label" },
    opacity: { value: 0.5, label: "label" },
    size: { value: { width: 200, height: 300 }, label: "label" },
  });

  useEffect(() => {
    console.log(values.color);
  }, [values.color]);

  const { oscillator } = oscillatorNode;

  useEffect(() => {
    oscillator.start();
    module[id] = oscillatorNode;
  }, []);

  const { maxValue, minValue, value } = oscillator.frequency;
  const [frequency, setFrequency] = useState<number>(
    value || DEFAULT_FREQUENCY
  );

  useEffect(() => {
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  }, [frequency]);

  const radioName = `radio-${+new Date()}`;
  return (
    <>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        style={{ top: 10 }}
        id="frequency"
      />
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="detune"
      />
      <Leva titleBar={{ drag: false, title: "Mario" }} fill />
      <div>{data.label || "oscillator"}</div>
      <div>{myValue}</div>
      <div>
        <label>
          <input
            name={radioName}
            type="radio"
            onChange={() => (oscillator.type = "sine")}
            defaultChecked
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
