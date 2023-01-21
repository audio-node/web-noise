import type { FC } from "react";

import styled from "@emotion/styled";
import { useMemo, useRef } from "react";
import Draggable from "react-draggable";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import {
  MdOutlineDragIndicator as DragIcon,
  MdOutlineExpandLess as ExpandIcon,
  MdOutlineExpandMore as CollapseIcon,
} from "react-icons/md";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import ControlPanelItem from "./ControlPanelItem";
import {
  IconsBarLeft,
  IconWrapper,
  PanelTitle,
  TitleBarWrapper,
} from "./styles";

const ControlPanelWrapper = styled.div<{ theme: Theme }>`
  position: fixed;
  z-index: 10002;
  box-shadow: 0px 1px 2px #111;
`;

const IconsBarRight = styled(IconsBarLeft)``;

const ControlPanelBody = styled.div<{ theme: Theme }>`
  width: 130px;
  height: auto;
  padding: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.elevation3};
  max-height: 95vh;
  overflow-y: scroll;
`;

const ControlPanel: FC = () => {
  const { width = 200, height = 100 } = {
    /* useStore(store => store.controlPanel) */
  };

  const theme = useTheme();
  const nodeRef = useRef(null);
  const nodes = useStore((store) => store.nodes);
  const { show, nodes: controlPanelNodes } = useStore(
    (store) => store.controlPanel
  );

  const filteredNodes = useMemo(() => {
    const nodeIds = controlPanelNodes.map(({ id }) => id);
    return nodes.filter(({ id }) => nodeIds.includes(id));
  }, [nodes, controlPanelNodes]);

  const showControlPanel = useStore((store) => store.showControlPanel);
  const hideControlPanel = useStore((store) => store.hideControlPanel);
  const setControlPanelNodes = useStore((store) => store.setControlPanelNodes);

  if (!filteredNodes.length) {
    return null;
  }

  return (
    <>
      {/* @ts-ignore */}
      <Draggable
        defaultPosition={{ x: 16, y: 16 }}
        handle=".handle"
        bounds=".Editor"
        nodeRef={nodeRef}
      >
        <ControlPanelWrapper theme={theme} ref={nodeRef}>
          <TitleBarWrapper theme={theme}>
            <IconsBarLeft>
              <IconWrapper theme={theme}>
                <DragIcon className="handle" />
              </IconWrapper>
            </IconsBarLeft>

            <PanelTitle>Control Panel</PanelTitle>
            <IconsBarRight>
              <IconWrapper
                style={{ height: "70%", cursor: "pointer" }}
                onClick={show ? hideControlPanel : showControlPanel}
                theme={theme}
              >
                {show ? <CollapseIcon /> : <ExpandIcon />}
              </IconWrapper>
            </IconsBarRight>
          </TitleBarWrapper>
          {show ? (
            <ControlPanelBody theme={theme}>
              <GridLayout
                layout={controlPanelNodes.map(
                  ({ id: i, width, height, x, y }, index) => ({
                    i,
                    w: width || 1,
                    h: height || 55,
                    x: x || 0,
                    y: y || controlPanelNodes.length + index,
                  })
                )}
                className="layout"
                cols={1}
                rowHeight={1}
                width={130}
                margin={[0, 0]}
                isResizable={false}
                draggableHandle=".grid-item-handle"
                onLayoutChange={(nodes) =>
                  setControlPanelNodes(
                    nodes.map(({ i, w, h, x, y }) => ({
                      id: i,
                      width: w,
                      height: h,
                      x,
                      y,
                    }))
                  )
                }
              >
                {filteredNodes.map((node) => {
                  return (
                    <div key={node.id}>
                      <ControlPanelItem node={node} />
                    </div>
                  );
                })}
              </GridLayout>
            </ControlPanelBody>
          ) : (
            <div />
          )}
        </ControlPanelWrapper>
      </Draggable>
    </>
  );
};

export default ControlPanel;
