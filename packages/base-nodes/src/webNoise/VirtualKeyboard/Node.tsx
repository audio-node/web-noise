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
import VirtualKeyboard from "./VirtualKeyboard";
import {
  VirtualKeyboardData,
  VirtualKeyboard as TVirtualKeyboard,
} from "./types";
import { withTheme } from "@emotion/react";

const VirtualKeyboardWrapper = withTheme(styled.div<{ theme: Theme }>`
  height: 100%;
  position: absolute;
  width: 100%;
`);

export interface VirtualKeyboardProps
  extends WNNodeProps<VirtualKeyboardData> {}

const VirtualKeyboardNode = (props: VirtualKeyboardProps) => {
  const { id, data } = props;
  const { node } = useAudioNode<TVirtualKeyboard>(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <WNNode {...props}>
      <VirtualKeyboardWrapper>
        <VirtualKeyboard
          node={props}
          audioNode={node}
          updateNodeValues={updateNodeValues}
        />
      </VirtualKeyboardWrapper>
    </WNNode>
  );
};

export default VirtualKeyboardNode;
