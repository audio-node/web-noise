import type { FC } from "react";

import styled from "@emotion/styled";
import "react-grid-layout/css/styles.css";
import { MdOutlineDragIndicator as DragIcon } from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import { WNNode } from "../../types";
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

const PanelNode: FC<{ node: WNNode }> = ({ node }) => {
  const controlPanelNodeTypes = useStore(
    (store) => store.controlPanelNodeTypes
  );

  const { type } = node;
  if (!type) {
    return null;
  }
  if (!controlPanelNodeTypes[type]) {
    console.error(`could not find node for type ${type}`);
    return null;
  }
  const ControlPanelNode = controlPanelNodeTypes[type];
  return <ControlPanelNode {...node} />;
};

const ControlPanelItem: FC<{ node: WNNode }> = ({ node }) => {
  const theme = useTheme();

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
      <PanelNode node={node} />
    </ControlPanelNodeWrapper>
  );
};

export default ControlPanelItem;
