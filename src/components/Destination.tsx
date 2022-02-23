import { useEffect, useMemo } from "react";
import { Handle, Position, NodeProps } from "react-flow-renderer";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEditorContext } from "./EditorContext";
import { registerNode } from "../Editor";

const createDestination = (audioContext: AudioContext) => {
  const destination = audioContext.destination;
  return {
    inputs: {
      in: {
        port: destination,
      },
    },
    destination,
  };
};

const Destination = ({ targetPosition, data, id }: NodeProps) => {
  const { audioContext } = useEditorContext();

  const destinationNode = useMemo(
    () => createDestination(audioContext),
    [audioContext, id]
  );

  const registerDestination = useSetRecoilState(registerNode(id));

  useEffect(() => {
    registerDestination(destinationNode);
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
