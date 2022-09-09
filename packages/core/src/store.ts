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

type RFState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  addNode: (node: Node) => void;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setElements: (elements: { nodes: Node[]; edges: Edge[] }) => void;
  clearElements: () => void;
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
  }
}));

export default useStore;
