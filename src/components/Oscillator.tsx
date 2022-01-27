import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const Oscillator = ({ targetPosition }: NodeProps) => {
  const context = useEditorContext();
  debugger;
  return (
    <>
      <div>oscillating</div>
      <Handle
        type="target"
        position={targetPosition || Position.Right}
        id="oscillator-out"
      />
    </>
  );
};

export default Oscillator;
