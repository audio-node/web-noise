import { addEdge, getConnectedEdges, NodeTypes, OnConnect } from "reactflow";
import { create, StateCreator } from "zustand";
import {
  Patch,
  createPatch,
  setAudioNodeTypes,
  AudioNodeTypes,
} from "@web-noise/patch";
import { CONTROL_PANEL_GRID_CONFIG } from "../constants";
import {
  ControlPanelNode,
  ControlPanelNodes,
  PluginComponent,
  PluginConfig,
  WNEdge,
  WNNode,
  GraphState,
  EditorStoreState as EditorState,
  ControlPanelState,
} from "../types";
import nodesStateCreator, { NodesState } from "./nodesStore";

export type { AudioNodeTypes, NodesState, GraphState };

interface EditorConfig {
  showMinimap: boolean;
}

type NodesConfiguration = Record<string, PluginComponent>;

type StoreState = NodesState & {
  patch: Patch;
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
  nodesConfiguration: NodesConfiguration;
  config: EditorConfig;
  setConfig: (config: Partial<EditorConfig>) => void;
  getEditorState: () => EditorState;
  setEditorState: (state: EditorState) => Promise<void>;
  isHelpShown: boolean;
  toggleHelp: () => void;
  /* move to control panel store */
  getControlPanelNode: (node: WNNode) => ControlPanelNode | null;
  controlPanel: ControlPanelState;
  setControlPanelNodes: (nodes: ControlPanelNodes) => void;
  showControlPanel: () => void;
  hideControlPanel: () => void;
  setControlPanelSize: (width: { width: number; height: number }) => void;
  addNodeToControlPanel: (node: WNNode) => void;
  removeNodeFromControlPanel: (node: WNNode) => void;
  removeNodesFromControlPanel: (nodes: WNNode[]) => void;
  /* / move to control panel store */
};

export const stateCreator: StateCreator<StoreState> = (...args) => {
  const [set, get] = args;
  return {
    ...nodesStateCreator(...args),
    patch: createPatch(),
    setGraph: async ({ nodes, edges }) => {
      const {
        patch,
        createNodes,
        createEdges,
        setNodesAndEdges,
        nodes: activeNodes,
        edges: activeEdges,
      } = get();
      setNodesAndEdges({ nodes: [], edges: [] });
      patch.unregisterAudioConnections(activeEdges);
      patch.unregisterAudioNodes(activeNodes);

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
    createNode: async (nodeData) => {
      const { patch, addNode, nodesConfiguration } = get();

      const { type, id, data } = nodeData;

      if (typeof type === "undefined") {
        throw new Error(`node type is not defined for node: ${id}`);
      }

      const node = {
        ...nodeData,
        data: {
          ...data,
          config: {
            ...nodesConfiguration[type]?.defaultConfig,
            ...data?.config,
          },
        },
      };

      await patch.registerAudioNode(node);
      addNode(node);
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
        ({ parentNode }) => parentNode && parentNodeIds.includes(parentNode),
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
      const { patch, edges, setEdges } = get();
      if (newEdges.length > edges.length) {
        patch.registerAudioConnections(newEdges.slice(edges.length));
      }
      setEdges(newEdges);
    },
    onConnect: async (connection) => {
      const { edges, createEdges } = get();
      const newEdges = addEdge(connection, edges);
      createEdges(newEdges);
    },
    onEdgesDelete: (edges) => {
      const { patch } = get();
      patch.unregisterAudioConnections(edges);
    },
    onNodesDelete: async (nodes) => {
      const { removeNodesFromControlPanel, patch } = get();
      removeNodesFromControlPanel(nodes);
      patch.unregisterAudioNodes(nodes);
    },
    plugins: [],
    setPlugins: async (plugins) => {
      const { setNodeTypes, patch } = get();
      set({ plugins });

      const nodesConf: NodesConfiguration = plugins.reduce((acc, plugin) => {
        return {
          ...acc,
          ...plugin.components.reduce(
            (subAcc, item) => ({
              ...subAcc,
              [item.type]: item,
            }),
            {},
          ),
        };
      }, {});

      const nodeTypes: NodeTypes = Object.keys(nodesConf).reduce(
        (acc, type) => {
          return {
            ...acc,
            [type]: nodesConf[type].node,
          };
        },
        {},
      );

      const audioNodeTypes: AudioNodeTypes = Object.keys(nodesConf).reduce(
        (acc, type) => {
          return {
            ...acc,
            [type]: nodesConf[type].audioNode,
          };
        },
        {},
      );

      setAudioNodeTypes(audioNodeTypes);
      setNodeTypes(nodeTypes);

      set(({ nodesConfiguration }) => ({
        nodesConfiguration: { ...nodesConfiguration, ...nodesConf },
      }));
    },
    nodesConfiguration: {},
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
    isHelpShown: false,
    showHelp: (showHelp) => set({ isHelpShown: showHelp }),
    toggleHelp: () => {
      const { isHelpShown: showHelp } = get();
      set({ isHelpShown: !showHelp });
    },
    getControlPanelNode: (node) => {
      const { nodesConfiguration } = get();
      const { type } = node;
      if (!type) {
        return null;
      }
      const controlPanelNode = nodesConfiguration[type]?.controlPanelNode;
      if (!controlPanelNode) {
        console.error(`could not find node for type ${type}`);
        return null;
      }
      return controlPanelNode;
    },
    controlPanel: {
      show: true,
      nodes: [],
      size: {
        width: 200,
        height: 100,
      },
    },
    showControlPanel: () =>
      set(({ controlPanel }) => ({
        controlPanel: { ...controlPanel, show: true },
      })),
    hideControlPanel: () =>
      set(({ controlPanel }) => ({
        controlPanel: { ...controlPanel, show: false },
      })),
    addNodeToControlPanel: (node) => {
      const { nodesConfiguration } = get();
      const defaultConfig = node.type
        ? nodesConfiguration[node.type]?.defaultConfig
        : {};
      const { height } = defaultConfig?.size || {};
      const newNode = {
        id: node.id,
        ...(height
          ? { height: height / CONTROL_PANEL_GRID_CONFIG.rowHeight }
          : {}),
      };
      set(({ controlPanel }) => ({
        controlPanel: {
          ...controlPanel,
          nodes: [...controlPanel.nodes, newNode],
        },
      }));
    },
    removeNodeFromControlPanel: (node) =>
      get().removeNodesFromControlPanel([node]),
    removeNodesFromControlPanel: (nodes) => {
      const nodeIds = nodes.map(({ id }) => id);
      set(({ controlPanel }) => {
        const nodes = controlPanel.nodes.filter(
          ({ id }) => !nodeIds.includes(id),
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
    setControlPanelSize: (size) => {
      set(({ controlPanel }) => {
        return {
          controlPanel: {
            ...controlPanel,
            size,
          },
        };
      });
    },
  };
};

const useStore = create<StoreState>(stateCreator);

export default useStore;
