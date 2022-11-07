import { ThemeProvider } from "@emotion/react";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useContextMenu } from "react-contexify";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowProvider,
} from "react-flow-renderer";
import useStore from "../store";
import "../styles";
import defaultTheme, { Theme } from "../theme";
import type { PluginConfig } from "../types";
import EditorContextMenu, {
  MENU_ID as EDITOR_CONTEXT_MENU_ID,
} from "./contextMenu/EditorContextMenu";
import ResumeContext from "./ResumeContext";
import ToggleMinimap from "./ToggleMinimap";
import Wire from "./Wire";

export interface Elements {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = ({
  elements,
  plugins = [],
  editorContextMenu = [],
  onChange = () => {},
  theme = defaultTheme,
}: {
  elements?: Elements;
  plugins?: Array<PluginConfig>;
  editorContextMenu?: Array<ReactNode>;
  onChange?: ({ nodes, edges }: Elements) => void;
  theme?: Theme;
}) => {
  const edgeTypes = useMemo(
    () => ({
      wire: Wire,
    }),
    []
  );

  const {
    nodes,
    edges,
    onNodesChange,
    onNodesDelete,
    onEdgesChange,
    onEdgesDelete,
    onConnect,
    setGraph,
    setPlugins,
  } = useStore();

  useEffect(() => onChange({ nodes, edges }), [nodes, edges]);

  const editorConfig = useStore(({ config }) => config);

  const nodeTypes = useStore(({ nodeTypes }) => nodeTypes);

  useEffect(() => setPlugins(plugins), [plugins]);

  useEffect(() => {
    if (elements) {
      setGraph(elements);
    }
  }, [elements, setGraph]);

  const [reactflowInstance, setReactflowInstance] = useState(null);

  const onInit = useCallback(
    (rfi) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance]
  );

  // const { onContextMenu, ...contextMenuProps } = useContextMenu();
  const { show: showEditorContextMenu } = useContextMenu({
    id: EDITOR_CONTEXT_MENU_ID,
  });

  return (
    <ThemeProvider theme={theme}>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          onEdgesDelete={onEdgesDelete}
          onInit={onInit}
          onNodeClick={onNodeClick}
          onContextMenu={showEditorContextMenu}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapGrid={snapGrid}
          defaultZoom={1.5}
          defaultEdgeOptions={{ type: "wire" }}
          snapToGrid
          fitView
        >
          <Background variant={BackgroundVariant.Dots} gap={12} />
          {editorConfig.showMinimap ? <MiniMap /> : null}

          <Controls
            style={{
              right: "1rem",
              left: "initial",
              bottom: "40%",
              top: "initial",
            }}
            showInteractive={false}
          >
            <ToggleMinimap />
          </Controls>

          <ResumeContext />
          <EditorContextMenu editorContextMenu={editorContextMenu} />
        </ReactFlow>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default Editor;
