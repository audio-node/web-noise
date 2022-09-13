import create from "zustand";
import {
  Edge,
  Node,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";

export interface WNNodeData {
  label: string;
  values?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export type WNNode = Node<WNNodeData>;

type RFState = {
  nodes: WNNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: WNNode) => void;
  setNodes: (nodes: WNNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setElements: (elements: { nodes: WNNode[]; edges: Edge[] }) => void;
  clearElements: () => void;
  getNode: (id: string) => WNNode | null;
  updateNodeData: (id: string, data: Partial<WNNodeData>) => void;
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set(({ nodes }) => ({
      nodes: applyNodeChanges(changes, nodes),
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
  setElements: ({ nodes, edges }) => {
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
}));

export default useStore;
