import type { FC } from "react";
import { useMemo } from "react";

import styled from "@emotion/styled";
import "react-grid-layout/css/styles.css";
import { MdOutlineDragIndicator as DragIcon } from "react-icons/md";
import useAudioNode from "../../hooks/useAudioNode";
import useNode from "../../hooks/useNode";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import { WNNode, ControlPanelNodeProps } from "../../types";
import {
  IconsBarLeft,
  IconWrapper,
  PanelTitle,
  TitleBarWrapper,
} from "./styles";

const ControlPanelNodeWrapper = styled.div<{ theme: Theme }>`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const PanelNode: FC<ControlPanelNodeProps> = (props) => {
  const { node } = props;

  const getControlPanelNode = useStore((store) => store.getControlPanelNode);

  const ControlPanelNode = useMemo(() => getControlPanelNode(node), [node]);

  if (!ControlPanelNode) {
    return null;
  }

  return <ControlPanelNode {...props} />;
};

interface ControlPanelItemProps {
  node: WNNode;
}

const ControlPanelItem: FC<ControlPanelItemProps> = (props) => {
  const { node } = props;
  const theme = useTheme();

  const { id } = node;
  const { node: audioNode } = useAudioNode(id) || {};
  const { updateNodeValues } = useNode(id);

  return (
    <ControlPanelNodeWrapper theme={theme}>
      <TitleBarWrapper theme={theme}>
        <IconsBarLeft>
          <IconWrapper theme={theme}>
            <DragIcon className="grid-item-handle" />
          </IconWrapper>
        </IconsBarLeft>

        <PanelTitle>{node.data.label}</PanelTitle>
      </TitleBarWrapper>
      <PanelNode
        node={node}
        audioNode={audioNode}
        updateNodeValues={updateNodeValues}
      />
    </ControlPanelNodeWrapper>
  );
};

export default ControlPanelItem;
