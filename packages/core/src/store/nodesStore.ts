import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  NodeTypes,
} from "react-flow-renderer";
import { StateCreator } from "zustand";
import { DRAG_HANDLE_SELECTOR } from "../constants";
import type { WNNode, WNNodeData, WNEdge } from "../types";

export interface GraphState {
  nodes: WNNode[];
  edges: WNEdge[];
}

//@TODO: rename to NodesStore
export interface NodesState {
  nodes: WNNode[];
  edges: WNEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: WNNode) => void;
  setNodes: (nodes: WNNode[]) => void;
  setEdges: (edges: WNEdge[]) => void;
  setNodesAndEdges: (elements: GraphState) => void;
  getNodesAndEdges: () => GraphState;
  clearElements: () => void;
  getNode: (id: string) => WNNode | null;
  updateNodeData: (id: string, data: Partial<WNNodeData>) => void;
  nodeTypes: NodeTypes;
  setNodeTypes: (nodeTypes: NodeTypes) => void;
}

const nodesStateCreator: StateCreator<NodesState> = (set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set(({ nodes }) => ({
      nodes: applyNodeChanges(changes, nodes).map((node) => ({
        dragHandle: DRAG_HANDLE_SELECTOR,
        ...node,
      })),
    }));
  },
  onEdgesChange: (changes) => {
    set(({ edges }) => ({
      edges: applyEdgeChanges(changes, edges),
    }));
  },
  onConnect: (connection) => {
    set(({ edges }) => ({
      edges: addEdge(connection, edges),
    }));
  },
  addNode: (node) => {
    set(({ nodes }) => ({
      nodes: nodes.concat(node),
    }));
  },
  setNodes: (nodes) => {
    set({
      nodes,
    });
  },
  setEdges: (edges) => {
    set({
      edges,
    });
  },
  setNodesAndEdges: ({ nodes, edges }) => {
    set({
      nodes,
      edges,
    });
  },
  getNodesAndEdges: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },
  clearElements: () => {
    set({
      nodes: [],
      edges: [],
    });
  },
  getNode: (id) => {
    const { nodes } = get();
    const node = nodes.find((node) => node.id === id);
    return node || null;
  },
  updateNodeData: (id, data) => {
    set(({ nodes }) => {
      return {
        nodes: nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }

          return node;
        }),
      };
    });
  },
  nodeTypes: {},
  setNodeTypes: (nodeTypes) => set({ nodeTypes }),
});

export default nodesStateCreator;
