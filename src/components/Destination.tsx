import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useEditorContext } from "./EditorContext";

const useDestination = (audioContext: AudioContext) =>
  useMemo(() => {
    const destination = audioContext.destination;
    return {
      inputs: {
        in: {
          port: destination,
        },
      },
      destination,
    };
  }, []);

const Destination = ({ targetPosition, data, id }: NodeProps) => {
  const { audioContext, module } = useEditorContext();
  const destinationNode = useDestination(audioContext);
  useEffect(() => {
    console.log("destination rendered", id);
    module[id] = destinationNode;
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
