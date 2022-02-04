import { useEffect } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const Destination = ({ targetPosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  useEffect(() => {
    console.log("destination rendered", id);
    module[id] = audioContext.destination;
  }, []);
  return (
    <>
      <div>destination</div>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="destination-in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Destination;
