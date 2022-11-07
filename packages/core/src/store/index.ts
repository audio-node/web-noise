import { OnConnect, addEdge, NodeTypes } from "react-flow-renderer";
import create from "zustand";
import { WNEdge, WNNode, PluginConfig } from "../types";
import audioNodesStateCreator, {
  AudioNodesState,
  AudioNodeState,
  AudioNodeTypes,
} from "./audioGraphStore";
import nodesStateCreator, { NodesState } from "./nodesStore";

export type { AudioNodeState, AudioNodeTypes, NodesState };

interface EditorConfig {
  showMinimap: boolean;
}

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
      plugins: Array<PluginConfig>;
      setPlugins: (plugins: Array<PluginConfig>) => void;
      config: EditorConfig;
      setConfig: (config: Partial<EditorConfig>) => void;
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
    plugins: [],
    setPlugins: async (plugins) => {
      const [nodeTypes, audioNodeTypes] = plugins.reduce<
        [NodeTypes, AudioNodeTypes]
      >(
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
      const { setAudioNodeTypes, setNodeTypes } = get();
      set({ plugins });
      setAudioNodeTypes(audioNodeTypes);
      setNodeTypes(nodeTypes);
    },
    config: { showMinimap: false },
    setConfig: (changes) => {
      set(({ config }) => ({ config: { ...config, ...changes } }));
    },
  };
});

export default useStore;
