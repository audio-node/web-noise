import { ThemeProvider } from "@emotion/react";
import { useCallback, useMemo, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import "../styles";
import AudioGraph from "./AudioGraph";
import ContextMenu from "./ContextMenu";
import ResumeContext from "./ResumeContext";
import Wire from "./Wire";
import { contextValue, ModuleContext } from "../Context";
import defaultTheme from '../theme';
import type { CreateWNAudioNode } from "../types";

export interface Elements {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export interface EditorConfig {
  nodes: Record<string, any>;
  audioNodes: Record<string, CreateWNAudioNode>;
}

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = ({
  elements,
  config = { nodes: {}, audioNodes: {} },
}: {
  elements?: Elements;
  config?: EditorConfig;
}) => {
  const nodeTypes = useMemo(() => config.nodes, [config]);

  const audioNodeTypes = useMemo(() => config.audioNodes, [config]);

  const edgeTypes = useMemo(
    () => ({
      wire: Wire,
    }),
    []
  );

  const { nodes: initialNodes, edges: initialEdges } = elements || {
    nodes: [],
    edges: [],
  };
  const [nodes, setNodes, onNodesChange] = useNodesState<Array<Node>>(
    initialNodes.map((node) => ({
      ...node,
      targetPosition: Position.Left,
      sourcePosition: Position.Right,
    }))
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

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

  const onAdd = useCallback(
    (nodeType, nodePosition) => {
      const newNode = {
        id: `${nodeType}-${+new Date()}`,
        type: nodeType,
        data: { label: nodeType },
        // TODO: calculate position properly!
        position: {
          x: nodePosition.x,
          y: nodePosition.y,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        dragHandle: ".leva-c-hwBXYF",
      };
      //@ts-ignore
      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  return (
    <ModuleContext.Provider value={contextValue}>
      <ThemeProvider theme={defaultTheme}>
        <ReactFlowProvider>
          <AudioGraph nodes={nodes} edges={edges} nodeTypes={audioNodeTypes} />
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeDragStop={onNodeDragStop}
            onInit={onInit}
            onNodeClick={onNodeClick}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            snapGrid={snapGrid}
            defaultZoom={1.5}
            defaultEdgeOptions={{ type: "wire" }}
            snapToGrid
            fitView
          >
            <Background variant={BackgroundVariant.Dots} gap={12} />
            <MiniMap />
            <Controls>
              <ResumeContext />
            </Controls>
          </ReactFlow>
          <ContextMenu
            nodeTypes={nodeTypes}
            onMenuItem={(nodeType, nodePosition) =>
              onAdd(nodeType, nodePosition)
            }
            onClearEditor={() => setNodes([])}
          />
        </ReactFlowProvider>
      </ThemeProvider>
    </ModuleContext.Provider>
  );
};

export default Editor;