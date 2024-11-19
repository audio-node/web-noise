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
import ADSR from "./ADSR";
import { ADSRData } from "./types";
import { ADSR as TADSR } from "./audioNode";

export interface ADSRProps extends WNNodeProps<ADSRData> {}

const ADSRNode = (props: ADSRProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TADSR>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <ADSR
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default ADSRNode;

