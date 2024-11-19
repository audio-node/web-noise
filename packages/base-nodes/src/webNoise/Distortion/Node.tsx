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
import Distortion from "./Distortion";
import { Distortion as TDistortion } from "./audioNode";

export interface DistortionProps extends WNNodeProps {}

const DistortionNode = (props: DistortionProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TDistortion>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <Distortion
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default DistortionNode;

