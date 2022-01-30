import { useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const Destination = ({ sourcePosition, data, id }: NodeProps) => {
  const { device, audioContext } = useEditorContext();
  useEffect(() => {
    console.log("destination rendered", id);
    device.addNode(id, audioContext.destination);
  }, []);
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
