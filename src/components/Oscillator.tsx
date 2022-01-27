import { Handle, Position, NodeProps } from "react-flow-renderer";

export default ({ targetPosition }: NodeProps) => {
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
