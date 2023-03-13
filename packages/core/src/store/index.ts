import {
  OnConnect,
  addEdge,
  getConnectedEdges,
  NodeTypes,
} from "reactflow";
import create, { StateCreator } from "zustand";
import {
  WNEdge,
  WNNode,
  PluginConfig,
  CreateWNContainerNode,
  ControlPanelNode,
  AudioNodeTypes,
} from "../types";
import audioNodesStateCreator, {
  AudioNodesState,
  AudioNodeState,
} from "./audioGraphStore";
import nodesStateCreator, { NodesState, GraphState } from "./nodesStore";

export type { AudioNodeState, AudioNodeTypes, NodesState, GraphState };

export interface ContainerNodeTypes
  extends Record<string, CreateWNContainerNode> {}

export interface ControlPanelNodeTypes
  extends Record<string, ControlPanelNode> {}

interface EditorConfig {
  showMinimap: boolean;
}

type ControlPanelNodes = Array<{
  id: WNNode["id"];
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}>;

interface ControlPanelState {
  show: boolean;
  nodes: ControlPanelNodes;
}

export interface EditorState extends GraphState {
  controlPanel: ControlPanelState;
}

type StoreState = AudioNodesState &
  NodesState & {
    setGraph: (elements: { nodes: WNNode[]; edges: WNEdge[] }) => Promise<void>;
    clearGraph: () => void;
    createNode: (node: WNNode) => Promise<void>;
    createNodes: (node: WNNode[]) => Promise<void>;
    removeNode: (node: WNNode) => void;
    removeNodes: (nodes: WNNode[]) => void;
    removeEdges: (nodes: WNEdge[]) => void;
    onConnect: OnConnect;
    createEdges: (edge: WNEdge[]) => void;
    onEdgesDelete: (edges: WNEdge[]) => void;
    onNodesDelete: (nodes: WNNode[]) => Promise<void>;
    plugins: Array<PluginConfig>;
    setPlugins: (plugins: Array<PluginConfig>) => void;
    config: EditorConfig;
    setConfig: (config: Partial<EditorConfig>) => void;
    containerNodeTypes: ContainerNodeTypes;
    setContainerNodeTypes: (containerNodeTypes: ContainerNodeTypes) => void;
    getEditorState: () => EditorState;
    setEditorState: (state: EditorState) => Promise<void>;
    /* move to control panel store */
    controlPanelNodeTypes: ControlPanelNodeTypes;
    setControlPanelNodeTypes: (
      controlPanelNodeTypes: ControlPanelNodeTypes
    ) => void;
    getControlPanelNode: (node: WNNode) => ControlPanelNode | null;
    controlPanel: ControlPanelState;
    setControlPanelNodes: (nodes: ControlPanelNodes) => void;
    showControlPanel: () => void;
    hideControlPanel: () => void;
    addNodeToControlPanel: (node: WNNode) => void;
    removeNodeFromControlPanel: (node: WNNode) => void;
    removeNodesFromControlPanel: (nodes: WNNode[]) => void;
    /* / move to control panel store */
  };

export const stateCreator: StateCreator<StoreState> = (...args) => {
  const [set, get] = args;
  return {
    ...audioNodesStateCreator(...args),
    ...nodesStateCreator(...args),
    setGraph: async ({ nodes, edges }) => {
      const {
        createNodes,
        createEdges,
        setNodesAndEdges,
        unregisterAudioConnections,
        unregisterAudioNodes,
        nodes: activeNodes,
        edges: activeEdges,
      } = get();
      setNodesAndEdges({ nodes: [], edges: [] });
      unregisterAudioConnections(activeEdges);
      unregisterAudioNodes(activeNodes);

      await createNodes(nodes);
      createEdges(edges);
    },
    clearGraph: () => {
      const { setGraph } = get();
      setGraph({ nodes: [], edges: [] });
    },
    createNodes: async (nodes) => {
      const { createNode } = get();
      await Promise.all(nodes.map((node) => createNode(node)));
    },
    createNode: async (node) => {
      const {
        addNode,
        registerAudioNode,
        registerAudioNodes,
        createNodes,
        createEdges,
        containerNodeTypes,
      } = get();

      if (typeof node.type === "undefined") {
        throw new Error(`node type is not defined for node: ${node.id}`);
      }

      const createContainerNode = containerNodeTypes[node.type];
      if (createContainerNode) {
        const patch = await createContainerNode(node);
        const extendedNode = {
          ...node,
          data: { ...node.data, values: { patch } },
        };
        await registerAudioNode(extendedNode);
        addNode(node);
      } else {
        await registerAudioNode(node);
        addNode(node);
      }
    },
    removeNode: (node) => get().removeNodes([node]),
    removeNodes: (nodes) => {
      const {
        edges,
        nodes: currentNodes,
        onNodesDelete,
        removeEdges,
        removeNodesFromControlPanel,
      } = get();
      const parentNodeIds = nodes.map(({ id }) => id);
      const children = currentNodes.filter(
        ({ parentNode }) => parentNode && parentNodeIds.includes(parentNode)
      );
      const resultingNodes = [...nodes, ...children];
      removeNodesFromControlPanel(resultingNodes);
      const connectedEdges = getConnectedEdges(resultingNodes, edges);
      removeEdges(connectedEdges);
      onNodesDelete(resultingNodes);
      const nodeIds = resultingNodes.map(({ id }) => id);
      set({
        nodes: currentNodes.filter(({ id }) => !nodeIds.includes(id)),
      });
    },
    removeEdges: (edges) => {
      const { edges: currentEdges, onEdgesDelete } = get();
      const edgeIds = edges.map(({ id }) => id);
      onEdgesDelete(edges);
      set({
        edges: currentEdges.filter(({ id }) => !edgeIds.includes(id)),
      });
    },
    createEdges: (newEdges) => {
      const { registerAudioConnections, edges, setEdges } = get();
      if (newEdges.length > edges.length) {
        registerAudioConnections(newEdges.slice(edges.length));
      }
      setEdges(newEdges);
    },
    onConnect: async (connection) => {
      const { registerAudioConnections, edges, setEdges, createEdges } = get();
      const newEdges = addEdge(connection, edges);
      createEdges(newEdges);
    },
    onEdgesDelete: (edges) => {
      const { unregisterAudioConnections } = get();
      unregisterAudioConnections(edges);
    },
    onNodesDelete: async (nodes) => {
      get().removeNodesFromControlPanel(nodes);
      const { unregisterAudioNodes } = get();
      unregisterAudioNodes(nodes);
    },
    plugins: [],
    setPlugins: async (plugins) => {
      const nodeTypes: NodeTypes = {};
      const audioNodeTypes: AudioNodeTypes = {};
      const containerNodeTypes: ContainerNodeTypes = {};
      const controlPanelNodeTypes: ControlPanelNodeTypes = {};
      for (let plugin of plugins) {
        for (let component of plugin.components) {
          const { node, audioNode, containerNode, controlPanelNode } =
            component;
          nodeTypes[component.type] = node;
          audioNodeTypes[component.type] = audioNode;
          if (typeof containerNode !== "undefined") {
            containerNodeTypes[component.type] = containerNode;
          }
          if (typeof controlPanelNode !== "undefined") {
            controlPanelNodeTypes[component.type] = controlPanelNode;
          }
        }
      }
      const {
        setAudioNodeTypes,
        setNodeTypes,
        setContainerNodeTypes,
        setControlPanelNodeTypes,
      } = get();
      set({ plugins });
      setAudioNodeTypes(audioNodeTypes);
      setNodeTypes(nodeTypes);
      setContainerNodeTypes(containerNodeTypes);
      setControlPanelNodeTypes(controlPanelNodeTypes);
    },
    config: { showMinimap: false },
    setConfig: (changes) => {
      set(({ config }) => ({ config: { ...config, ...changes } }));
    },
    getEditorState: () => {
      const { getNodesAndEdges, controlPanel } = get();
      return {
        ...getNodesAndEdges(),
        controlPanel,
      };
    },
    setEditorState: async ({ nodes, edges, controlPanel }) => {
      const { setGraph } = get();
      await setGraph({ nodes, edges });
      set({
        controlPanel,
      });
    },
    containerNodeTypes: {},
    setContainerNodeTypes: (containerNodeTypes) => set({ containerNodeTypes }),
    controlPanelNodeTypes: {},
    setControlPanelNodeTypes: (controlPanelNodeTypes) =>
      set({ controlPanelNodeTypes }),
    getControlPanelNode: (node) => {
      const { controlPanelNodeTypes } = get();
      const { type } = node;
      if (!type) {
        return null;
      }
      if (!controlPanelNodeTypes[type]) {
        console.error(`could not find node for type ${type}`);
        return null;
      }
      return controlPanelNodeTypes[type];
    },
    controlPanel: {
      show: true,
      nodes: [],
    },
    showControlPanel: () =>
      set(({ controlPanel }) => ({
        controlPanel: { ...controlPanel, show: true },
      })),
    hideControlPanel: () =>
      set(({ controlPanel }) => ({
        controlPanel: { ...controlPanel, show: false },
      })),
    addNodeToControlPanel: (node) =>
      set(({ controlPanel }) => ({
        controlPanel: {
          ...controlPanel,
          nodes: [...controlPanel.nodes, { id: node.id }],
        },
      })),
    removeNodeFromControlPanel: (node) =>
      get().removeNodesFromControlPanel([node]),
    removeNodesFromControlPanel: (nodes) => {
      const nodeIds = nodes.map(({ id }) => id);
      set(({ controlPanel }) => {
        const nodes = controlPanel.nodes.filter(
          ({ id }) => !nodeIds.includes(id)
        );
        return {
          controlPanel: {
            ...controlPanel,
            nodes,
          },
        };
      });
    },
    setControlPanelNodes: (nodes) => {
      set(({ controlPanel }) => {
        return {
          controlPanel: {
            ...controlPanel,
            nodes,
          },
        };
      });
    },
  };
};

const useStore = create<StoreState>(stateCreator);

export default useStore;
