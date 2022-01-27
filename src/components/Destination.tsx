import { Handle, Position, NodeProps } from "react-flow-renderer";

export default ({ sourcePosition }: NodeProps) => {
  return (
    <>
      <div>outputting</div>
      <Handle
        type="source"
        position={sourcePosition || Position.Left}
        id="destination-in"
      />
    </>
  );
};
