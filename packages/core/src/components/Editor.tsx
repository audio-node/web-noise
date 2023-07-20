import { ThemeProvider } from "@emotion/react";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import 'reactflow/dist/style.css';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  ReactFlowProvider,
} from "reactflow";
import useStore, { EditorState } from "../store";
import "../styles";
import defaultTheme, { Theme } from "../theme";
import type { PluginConfig } from "../types";
import EditorContextMenu, {
  useEditorContextMenu,
} from "./contextMenu/EditorContextMenu";
import NodeContextMenu, {
  useNodeContextMenu,
} from "./contextMenu/NodeContextMenu";
import EdgeContextMenu, {
  useEdgeContextMenu,
} from "./contextMenu/EdgeContextMenu";
import ResumeContext from "./ResumeContext";
import ToggleMinimap from "./ToggleMinimap";
import ControlPanel from "./ControlPanel";
import Wire from "./Wire";

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
  elements?: EditorState;
  plugins?: Array<PluginConfig>;
  editorContextMenu?: Array<ReactNode>;
  onChange?: ({ nodes, edges, controlPanel }: EditorState) => void;
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
    controlPanel,
    onNodesChange,
    onNodesDelete,
    onEdgesChange,
    onEdgesDelete,
    onConnect,
    setEditorState,
    setPlugins,
  } = useStore();

  useEffect(
    () => onChange({ nodes, edges, controlPanel }),
    [nodes, edges, controlPanel]
  );

  const editorConfig = useStore(({ config }) => config);

  const nodeTypes = useStore(({ nodeTypes }) => nodeTypes);

  useEffect(() => setPlugins(plugins), [plugins]);

  useEffect(() => {
    if (elements) {
      setEditorState(elements);
    }
  }, [elements, setEditorState]);

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

  const { onContextMenu: onEditorContextMenu } = useEditorContextMenu();
  const { onContextMenu: onNodeContextMenu } = useNodeContextMenu();
  const { onContextMenu: onEdgeContextMenu } = useEdgeContextMenu();

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
          onContextMenu={onEditorContextMenu}
          onNodeContextMenu={onNodeContextMenu}
          onEdgeContextMenu={onEdgeContextMenu}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapGrid={snapGrid}
          defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
          defaultEdgeOptions={{ type: "wire" }}
          snapToGrid
          fitView
          disableKeyboardA11y
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
          <ControlPanel />
          <EditorContextMenu editorContextMenu={editorContextMenu} />
          <NodeContextMenu />
          <EdgeContextMenu />
        </ReactFlow>
      </ReactFlowProvider>
    </ThemeProvider>
  );
};

export default Editor;
