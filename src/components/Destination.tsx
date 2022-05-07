import styled from "@emotion/styled";
import { FC } from "react";
import { Handle, NodeProps, Position } from "react-flow-renderer";
import { MdSpeaker } from "react-icons/md";
import { useNode } from "../ModuleContext";
import { Destination as TDestination } from "../nodes";
import { TitleBar } from "./Node";

const TitleBarWrapper = styled(TitleBar)`
  width: auto;
  height: auto;
  padding: 0.5rem;
`;

const SpeakerIcon = styled(MdSpeaker)`
  width: 3rem;
  height: 3rem;
`;

const Destination: FC<NodeProps> = ({ targetPosition, id }) => {
  useNode<TDestination>(id);

  return (
    <>
      <TitleBarWrapper>
        <SpeakerIcon />
      </TitleBarWrapper>
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
