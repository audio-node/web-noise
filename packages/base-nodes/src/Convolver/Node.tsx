import styled from "@emotion/styled";
import {
  useAudioNode,
  useNode,
  WNNode,
  TWNNode,
  WNNodeProps,
  Theme,
  useTheme,
} from "@web-noise/core";
import Convolver from "./Convolver";
import { ConvolverData } from "./types";
import { Convolver as TConvolver } from "./audioNode";

export interface ConvolverProps extends WNNodeProps<ConvolverData> {}

const ConvolverNode = (props: ConvolverProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TConvolver>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Convolver
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default ConvolverNode;

