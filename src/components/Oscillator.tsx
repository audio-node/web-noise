import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const Oscillator = ({ targetPosition, id }: NodeProps) => {
  const { device, audioContext } = useEditorContext();
  const oscillator = useMemo(() => {
    console.log("create oscillator");
    return audioContext.createOscillator();
  }, []);
  useEffect(() => {
    console.log("oscillator rendered", id);

    oscillator.start();
    device.addNode(id, oscillator);
  }, []);
  const radioName = `radio-${+new Date()}`;
  return (
    <>
      <div>oscillating</div>
      <Handle
        type="target"
        position={targetPosition || Position.Right}
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
    </>
  );
};

export default Oscillator;
