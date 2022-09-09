import { ThemeProvider } from "@emotion/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Edge,
  MiniMap,
  Node,
  NodeTypes,
  Position,
  ReactFlowProvider,
} from "react-flow-renderer";
import { DRAG_HANDLE_SELECTOR } from "../constants";
import { contextValue, ModuleContext } from "../Context";
import useStore from "../store";
import "../styles";
import defaultTheme from "../theme";
import type { CreateWNAudioNode } from "../types";
import useAudioGraph, { NodeTypes as AudioNodeTypes } from "../hooks/useAudioGraph";
import ContextMenu from "./ContextMenu";
import ResumeContext from "./ResumeContext";
import SharePatch from "./SharePatch";
import Wire from "./Wire";

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

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    setElements,
    clearElements,
    addNode,
  } = useStore();

  useEffect(() => {
    if (elements) {
      setElements(elements);
    }
  }, [elements, setElements]);

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
        position: {
          x: nodePosition.x,
          y: nodePosition.y,
        },
        targetPosition: Position.Left,
        sourcePosition: Position.Right,
        dragHandle: DRAG_HANDLE_SELECTOR,
      };
      addNode(newNode);
    },
    [addNode]
  );

  useAudioGraph({ nodeTypes: audioNodeTypes });

  return (
    <ModuleContext.Provider value={contextValue}>
      <ThemeProvider theme={defaultTheme}>
        <ReactFlowProvider>
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
              <SharePatch />
            </Controls>
          </ReactFlow>
          <ContextMenu
            nodeTypes={nodeTypes}
            onMenuItem={(nodeType, nodePosition) =>
              onAdd(nodeType, nodePosition)
            }
            onClearEditor={clearElements}
          />
        </ReactFlowProvider>
      </ThemeProvider>
    </ModuleContext.Provider>
  );
};

export default Editor;
