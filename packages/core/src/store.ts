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
};

const useStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
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
}));

export default useStore;
