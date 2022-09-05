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
  NodeTypes,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "react-flow-renderer";
import "../styles";
import AudioGraph, { NodeTypes as AudioNodeTypes } from "./AudioGraph";
import ContextMenu from "./ContextMenu";
import ResumeContext from "./ResumeContext";
import Wire from "./Wire";
import { contextValue, ModuleContext } from "../Context";
import defaultTheme from "../theme";
import type { CreateWNAudioNode } from "../types";
import { DRAG_HANDLE_SELECTOR } from '../constants'

export interface Elements {
  nodes: Array<Node>;
  edges: Array<Edge>;
}

export interface PluginComponent {
  id?: string;
  type: string;
  node: any;
  audioNode: CreateWNAudioNode;
  description?: string;
  name?: string;
}

export interface PluginConfig {
  components: Array<PluginComponent>;
  name?: string;
  description?: string;
}

const onNodeDragStop = (_event: any, node: any) =>
  console.log("drag stop", node);
const onNodeClick = (_event: any, element: any) =>
  console.log("click", element);

const snapGrid: [number, number] = [20, 20];

export const Editor = ({
  elements,
  plugins = [],
}: {
  elements?: Elements;
  plugins?: Array<PluginConfig>;
}) => {
  const [nodeTypes, audioNodeTypes] = useMemo(() => {
    return plugins.reduce<[NodeTypes, AudioNodeTypes]>(
      ([accNodes, accAudioNodes], plugin) => {
        const [nodes, audioNodes] = plugin.components.reduce<
          [NodeTypes, AudioNodeTypes]
        >(
          ([pluginNodes, pluginAudioNodes], component) => {
            return [
              {
                ...pluginNodes,
                [component.type]: component.node,
              },
              {
                ...pluginAudioNodes,
                [component.type]: component.audioNode,
              },
            ];
          },
          [{}, {}]
        );
        return [
          {
            ...accNodes,
            ...nodes,
          },
          {
            ...accAudioNodes,
            ...audioNodes,
          },
        ];
      },
      [{}, {}]
    );
  }, [plugins]);

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
      dragHandle: DRAG_HANDLE_SELECTOR,
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
        dragHandle: DRAG_HANDLE_SELECTOR,
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
