import { Handle, Position, NodeProps } from "react-flow-renderer";

const Destination = ({ sourcePosition, data }: NodeProps) => {
  return (
    <>
      <div>destinating</div>
      <Handle
        type="source"
        position={sourcePosition || Position.Left}
        id="destination-in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Destination;
