import styled from "@emotion/styled";
import { Resizable } from "re-resizable";
import { useMemo, useRef, useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import {
  AiFillLock as LockIcon,
  AiFillUnlock as UnlockIcon,
} from "react-icons/ai";
import { MdClose as CloseIcon } from "react-icons/md";
import { RxDashboard as ControlPanelIcon } from "react-icons/rx";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { CONTROL_PANEL_GRID_CONFIG } from "../../constants";
import useTheme from "../../hooks/useTheme";
import useStore from "../../store";
import { Theme } from "../../theme";
import ControlPanelItem from "./ControlPanelItem";
import { IconsBar, IconWrapper, PanelTitle, TitleBarWrapper } from "./styles";

const ControlPanelIconWrapper = styled.div<{ theme: Theme }>`
  position: fixed;
  z-index: 5;
  box-shadow: 0px 1px 2px ${({ theme }) => theme.colors.elevation2};
  left: 1rem;
  top: 4rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.elevation1};
  color: ${({ theme }) => theme.colors.highlight1};

  :hover {
    color: ${({ theme }) => theme.colors.highlight2};
    cursor: pointer;
  }
`;

const ControlPanelIconsBar = styled(IconsBar)`
  height: 80%;
`;

const CloseIconWrapper = styled(IconWrapper)`
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

const ControlPanelHeader = styled(TitleBarWrapper)<{ theme: Theme }>`
  grid-template-columns: 1fr auto;
  border-bottom: 1px solid ${({ theme }) => theme.colors.elevation3};
  font-size: 0.7rem;
`;

const ControlPanelTitle = styled(PanelTitle)`
  text-align: center;
`;

const ControlPanelWrapper = styled.div`
  height: 100%;
  width: 100%;
  padding: 0.3rem 0.4rem;
  box-sizing: border-box;
`;

const ControlPanelBody = styled.div<{ theme: Theme }>`
  height: auto;
  padding: 0;
  max-height: 95vh;
  overflow-y: scroll;
  border: 1px solid ${({ theme }) => theme.colors.elevation3};
`;

const ControlPanelSettings = styled.div`
  padding: 1rem 0;
  font-family: var(--leva-fonts-mono);
  font-size: 0.8rem;
`;

const LockGridWrapper = styled.div<{ theme: Theme }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.highlight1};
  &:hover {
    color: ${({ theme }) => theme.colors.highlight2};
  }
`;

const GridResizeHandle = styled.div<{ theme: Theme }>`
  position: absolute;
  height: 1rem;
  top: 0;
  bottom: 0;
  margin: auto;
  left: 0.5rem;
  border-right: 1px solid ${({ theme }) => theme.colors.whitePrimary};
`;

const ControlPanelItemWrapper = styled.div<{ theme: Theme }>`
  box-sizing: border-box;
  overflow: hidden;
  .react-resizable-handle:after {
    border-color: ${({ theme }) => theme.colors.whitePrimary};
    border-width: 1px;
  }
`;

const ControlPanel = () => {
  const theme = useTheme();
  const nodeRef = useRef(null);
  const nodes = useStore((store) => store.nodes);
  const {
    show,
    nodes: controlPanelNodes,
    size,
  } = useStore((store) => store.controlPanel);

  const { width = 200, height } = size;

  const filteredNodes = useMemo(() => {
    const nodeIds = controlPanelNodes.map(({ id }) => id);
    return nodes.filter(({ id }) => nodeIds.includes(id));
  }, [nodes, controlPanelNodes]);

  const showControlPanel = useStore((store) => store.showControlPanel);
  const hideControlPanel = useStore((store) => store.hideControlPanel);
  const setControlPanelNodes = useStore((store) => store.setControlPanelNodes);
  const setControlPanelSize = useStore((store) => store.setControlPanelSize);
  const removeNodeFromControlPanel = useStore(
    (store) => store.removeNodeFromControlPanel,
  );

  const [isGridLocked, setGridLocked] = useState(true);

  const layout = useMemo(() => {
    const fallbackY = controlPanelNodes.reduce(
      (acc, { height = CONTROL_PANEL_GRID_CONFIG.rowHeight, x, y = 0 }) => {
        const Y = y + height;
        return Y > acc ? Y : acc;
      },
      0,
    );
    return controlPanelNodes.map(({ id: i, width, height, x, y }) => {
      return {
        i,
        w: width || CONTROL_PANEL_GRID_CONFIG.cols,
        h: height || 6,
        x: x ?? 0,
        y: y ?? fallbackY,
      };
    });
  }, [controlPanelNodes]);

  if (!filteredNodes.length) {
    return null;
  }

  return (
    <>
      <ControlPanelIconWrapper
        theme={theme}
        ref={nodeRef}
        onClick={showControlPanel}
      >
        <ControlPanelIcon />
      </ControlPanelIconWrapper>
      <Drawer
        open={show}
        onClose={hideControlPanel}
        direction="left"
        className=""
        size="auto"
        enableOverlay={false}
        style={{
          background: theme.colors.elevation1,
          position: "absolute",
        }}
      >
        <ControlPanelHeader theme={theme}>
          <ControlPanelTitle>Control Panel</ControlPanelTitle>
          <ControlPanelIconsBar>
            <CloseIconWrapper onClick={hideControlPanel} theme={theme}>
              <CloseIcon />
            </CloseIconWrapper>
          </ControlPanelIconsBar>
        </ControlPanelHeader>

        <ControlPanelWrapper>
          <ControlPanelSettings>
            {isGridLocked ? (
              <LockGridWrapper
                theme={theme}
                onClick={() => setGridLocked(false)}
              >
                <LockIcon />
                Unlock grid
              </LockGridWrapper>
            ) : (
              <LockGridWrapper
                theme={theme}
                onClick={() => setGridLocked(true)}
              >
                <UnlockIcon />
                Lock grid
              </LockGridWrapper>
            )}
          </ControlPanelSettings>
          <Resizable
            enable={{
              top: false,
              right: !isGridLocked,
              bottom: false,
              left: false,
              topRight: false,
              bottomRight: false,
              bottomLeft: false,
              topLeft: false,
            }}
            handleComponent={{
              right: <GridResizeHandle theme={theme} />,
            }}
            minWidth={120}
            size={{ width, height: "auto" }}
            onResizeStop={(e, direction, ref, d) => {
              setControlPanelSize({
                width: width + d.width,
                height: height + d.height,
              });
            }}
          >
            <ControlPanelBody theme={theme}>
              <GridLayout
                layout={layout}
                className="layout"
                cols={CONTROL_PANEL_GRID_CONFIG.cols}
                rowHeight={CONTROL_PANEL_GRID_CONFIG.rowHeight}
                width={width}
                margin={[0, 0]}
                isResizable={!isGridLocked}
                draggableHandle=".grid-item-handle"
                onLayoutChange={(nodes) => {
                  requestAnimationFrame(() => {
                    setControlPanelNodes(
                      nodes.map(({ i, w, h, x, y }) => ({
                        id: i,
                        width: w,
                        height: h,
                        x,
                        y,
                      })),
                    );
                  });
                }}
              >
                {filteredNodes.map((node) => {
                  return (
                    <ControlPanelItemWrapper key={node.id} theme={theme}>
                      <ControlPanelItem
                        node={node}
                        showControls={!isGridLocked}
                        onDelete={removeNodeFromControlPanel}
                      />
                    </ControlPanelItemWrapper>
                  );
                })}
              </GridLayout>
            </ControlPanelBody>
          </Resizable>
        </ControlPanelWrapper>
      </Drawer>
    </>
  );
};

export default ControlPanel;
