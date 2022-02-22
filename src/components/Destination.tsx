import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEditorContext } from "./EditorContext";
import { registerModule } from "../Editor";

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

  const setDestinationNode = useSetRecoilState(registerModule(id));

  useEffect(() => {
    setDestinationNode(destinationNode);
  }, []);

  return (
    <>
      <div>destination</div>
      <Handle
        type="target"
        position={targetPosition || Position.Left}
        id="in"
        onConnect={(params) => console.log("handle onConnect", params)}
      />
    </>
  );
};

export default Destination;
