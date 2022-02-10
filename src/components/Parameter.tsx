import { useEffect, useMemo, useRef, useState } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const useParameter = (audioContext: AudioContext) =>
  useMemo(() => {
    const constantSource = audioContext.createConstantSource();
    return {
      outputs: {
        out: {
          port: constantSource,
        },
      },
      constantSource,
    };
  }, [audioContext]);

const Parameter = ({ targetPosition, sourcePosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const inputRange = useRef<HTMLInputElement>(null);

  const parameterNode = useParameter(audioContext);

  const [min, setMin] = useState(data.min || 0);
  const [max, setMax] = useState(data.max || 1);
  const [step, setStep] = useState(data.step || 1);
  const [value, setValue] = useState(data.value || 1);

  useEffect(() => {
    parameterNode.constantSource.start();
    module[id] = parameterNode;
  }, []);

  useEffect(() => {
    parameterNode.constantSource.offset.value = value;
  }, [value]);

  return (
    <>
      <div className="dragHandle">{data.label || "parameter"}</div>
      <input
        type="range"
        value={value}
        ref={inputRange}
        min={min}
        max={max}
        step={step}
        onChange={({ target: { value } }) => setValue(+value)}
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

      <div style={{ display: `flex` }}>
        <label style={{ padding: `0.5em`, width: "50%" }}>
          step:
          <input
            style={{ width: `90%` }}
            type="number"
            value={step}
            onChange={({ target: { value } }) => setStep(+value)}
          />
        </label>

        <label style={{ padding: `0.5em` }}>
          value:
          <input
            style={{ width: `90%` }}
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={({ target: { value } }) => setValue(+value)}
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

export default Parameter;
