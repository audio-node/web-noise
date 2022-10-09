import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
} from "react-flow-renderer";
import { StateCreator } from "zustand";
import { DRAG_HANDLE_SELECTOR } from "../constants";
import type { WNNode, WNNodeData, WNEdge } from "../types";

export interface NodesState {
  nodes: WNNode[];
  edges: WNEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: WNNode) => void;
  setNodes: (nodes: WNNode[]) => void;
  setEdges: (edges: WNEdge[]) => void;
  setNodesAndEdges: (elements: { nodes: WNNode[]; edges: WNEdge[] }) => void;
  clearElements: () => void;
  getNode: (id: string) => WNNode | null;
  updateNodeData: (id: string, data: Partial<WNNodeData>) => void;
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
});

export default nodesStateCreator;