import styled from "@emotion/styled";
import {
  InputHandle,
  useAudioNode,
  useNode,
  WNAudioNode,
} from "@web-noise/core";
import Destination from "./Destination";
import { DestinationProps } from "./types";

const DestinationNodeWrapper = styled.div`
  width: 3rem;
  height: 3rem;
`;

const DestinationNode = (props: DestinationProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<WNAudioNode>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <DestinationNodeWrapper>
      <Destination
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
      <InputHandle id="in" />
    </DestinationNodeWrapper>
  );
};

export default DestinationNode;
