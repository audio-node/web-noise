import { useEffect } from "react";
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
import MathNode from "./MathNode";
import { MathNodeData, MathNode as TMathNode  } from "./types";

export interface MathNodeProps extends WNNodeProps<MathNodeData> {}

const MathNodeNode = (props: MathNodeProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TMathNode>(id) || {};
  const { updateNodeValues } = useNode(id);

  useEffect(() => node?.setValues?.(data.values), [node, data.values]);

  return (
    <WNNode {...props}>
      <MathNode
        node={props}
        audioNode={node}
        updateNodeValues={updateNodeValues}
      />
    </WNNode>
  );
};

export default MathNodeNode;

