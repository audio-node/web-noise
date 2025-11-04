import { withTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlowInstance,
  ReactFlowProvider,
  useOnViewportChange,
} from "reactflow";
import "reactflow/dist/style.css";
import useStore from "../../store";
import type { EditorState, PluginConfig } from "../../types";
import { type Theme } from "../../theme";
import EdgeContextMenu, {
  useEdgeContextMenu,
} from "../contextMenu/EdgeContextMenu";
import EditorContextMenu, {
  useEditorContextMenu,
} from "../contextMenu/EditorContextMenu";
import NodeContextMenu, {
  useNodeContextMenu,
} from "../contextMenu/NodeContextMenu";
import ControlPanel from "../ControlPanel";
import { HelpButton, HelpModal } from "../Help";
import ResumeContext from "../ResumeContext";
import ToggleMinimap from "../ToggleMinimap";
import Wire from "../Wire";

const StyledControls = withTheme(styled(Controls)<{ theme: Theme }>`
  &.bottom {
    right: 1rem;
    bottom: 40%;
  }

  svg {
    color: ${({ theme }) => theme.colors.elevation2};
  }
`);

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

interface EditorProps {
  editorState?: EditorState;
  plugins?: Array<PluginConfig>;
  editorContextMenu?: Array<ReactNode>;
  onChange?: ({ nodes, edges, controlPanel }: EditorState) => void;
}

export const EditorPane = ({
  editorState,
  plugins = [],
  editorContextMenu = [],
  onChange = () => {},
  ...props
}: EditorProps) => {
  const edgeTypes = useMemo(
    () => ({
      wire: Wire,
    }),
    [],
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
    setPlugins,
    setViewport,
    viewport,
  } = useStore();

  const editorConfig = useStore(({ config }) => config);

  const nodeTypes = useStore(({ nodeTypes }) => nodeTypes);

  useEffect(() => {
    setPlugins(plugins);
  }, [plugins]);

  const [reactflowInstance, setReactflowInstance] =
    useState<ReactFlowInstance | null>(null);

  useEffect(() => {
    if (!reactflowInstance) {
      return;
    }
    onChange({
      nodes,
      edges,
      controlPanel,
      viewport,
    });
  }, [nodes, edges, controlPanel, viewport]);

  const onInit = useCallback(
    (rfi: ReactFlowInstance) => {
      if (!reactflowInstance) {
        setReactflowInstance(rfi);
        console.log("flow loaded:", rfi);
      }
    },
    [reactflowInstance],
  );

  const { onContextMenu: onEditorContextMenu } = useEditorContextMenu();
  const { onContextMenu: onNodeContextMenu } = useNodeContextMenu();
  const { onContextMenu: onEdgeContextMenu } = useEdgeContextMenu();

  useEffect(() => {
    if (!viewport) {
      return;
    }
    reactflowInstance?.setViewport(viewport);
  }, [viewport, reactflowInstance]);

  useOnViewportChange({
    onEnd: setViewport,
  });

  return (
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
      defaultViewport={editorState?.viewport}
      defaultEdgeOptions={{ type: "wire" }}
      snapToGrid
      fitView
      disableKeyboardA11y
    >
      <Background variant={BackgroundVariant.Dots} gap={12} />
      {editorConfig.showMinimap ? <MiniMap /> : null}

      <StyledControls showInteractive={false} position="bottom-right">
        <ToggleMinimap />
        <HelpButton />
      </StyledControls>

      <ResumeContext />
      <ControlPanel />
      <HelpModal />
      <EditorContextMenu editorContextMenu={editorContextMenu} />
      <NodeContextMenu />
      <EdgeContextMenu />
    </ReactFlow>
  );
};

export const Editor = (props: EditorProps) => (
  <ReactFlowProvider>
    <EditorPane {...props} />
  </ReactFlowProvider>
);

export default Editor;
