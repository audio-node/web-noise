import { OnConnect, addEdge } from "react-flow-renderer";
import create from "zustand";
import { WNEdge, WNNode } from "../types";
import audioNodesStateCreator, {
  AudioNodesState,
  AudioNodeState,
  AudioNodeTypes,
} from "./audioGraphStore";
import nodesStateCreator, { NodesState } from "./nodesStore";

export type { AudioNodeState, AudioNodeTypes, NodesState };

const useStore = create<
  AudioNodesState &
    NodesState & {
      setGraph: (elements: {
        nodes: WNNode[];
        edges: WNEdge[];
      }) => Promise<void>;
      clearGraph: () => void;
      createNode: (node: WNNode) => void;
      onConnect: OnConnect;
      onEdgesDelete: (edges: WNEdge[]) => void;
      onNodesDelete: (nodes: WNNode[]) => Promise<void>;
    }
>((...args) => {
  const [set, get] = args;
  return {
    ...audioNodesStateCreator(...args),
    ...nodesStateCreator(...args),
    setGraph: async ({ nodes, edges }) => {
      const {
        registerAudioNodes,
        registerAudioConnections,
        setNodesAndEdges,
        unregisterAudioConnections,
        unregisterAudioNodes,
        nodes: activeNodes,
        edges: activeEdges,
      } = get();
      setNodesAndEdges({ nodes: [], edges: [] });
      unregisterAudioConnections(activeEdges);
      unregisterAudioNodes(activeNodes);
      await registerAudioNodes(nodes);
      registerAudioConnections(edges);
      setNodesAndEdges({ nodes, edges });
    },
    clearGraph: () => {
      const { setGraph } = get();
      setGraph({ nodes: [], edges: [] });
    },
    createNode: (node) => {
      const { addNode, registerAudioNode } = get();
      registerAudioNode(node);
      addNode(node);
    },
    onConnect: async (connection) => {
      const { registerAudioConnections, edges, setEdges } = get();
      const newEdges = addEdge(connection, edges);
      if (newEdges.length > edges.length) {
        registerAudioConnections(newEdges.slice(edges.length));
      }
      setEdges(newEdges);
    },
    onEdgesDelete: (edges) => {
      const { unregisterAudioConnections } = get();
      unregisterAudioConnections(edges);
    },
    onNodesDelete: async (nodes) => {
      const { unregisterAudioNodes } = get();
      unregisterAudioNodes(nodes);
    },
  };
});

export default useStore;
