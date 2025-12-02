import {
  addEdge,
  getConnectedEdges,
  NodeTypes,
  OnConnect,
  Viewport,
} from "@xyflow/react";
import { create, StateCreator } from "zustand";
import { setAudioNodeTypes, AudioNodeTypes } from "@web-noise/patch";
import { CONTROL_PANEL_GRID_CONFIG } from "../constants";
import generateNodeId from "../helpers/generateNodeId";
import {
  ControlPanelNode,
  ControlPanelNodes,
  PluginComponent,
  PluginConfig,
  WNEdge,
  WNNode,
  GraphState,
  EditorState,
  ControlPanelState,
  EditorStoreState,
} from "../types";
import nodesStateCreator, { NodesState } from "./nodesStore";
import history, { historyStateCreator, HistoryState } from "./history";
import audioPatch, {
  AudioPatchState,
  audioPatchStateCreator,
} from "./audioPatch";
import projectStateCreator, { ProjectState } from "./projectStore";

export type { AudioNodeTypes, NodesState, GraphState };

interface EditorConfig {
  showMinimap: boolean;
}

type NodesConfiguration = Record<string, PluginComponent>;

export type StoreState = NodesState &
  HistoryState &
  ProjectState &
  AudioPatchState & {
    setGraph: (elements: { nodes: WNNode[]; edges: WNEdge[] }) => Promise<void>;
    clearGraph: () => void;
    createNode: (node: WNNode) => void;
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
    copyBuffer: { nodes: WNNode[]; edges: WNEdge[] };
    copy: (elements: { nodes: WNNode[]; edges: WNEdge[] }) => void;
    copySelectedItems: () => void;
    pasteBuffer: (x: number, y: number) => void;
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
    viewport: Viewport;
    setViewport: (viewport: Viewport) => void;
  };

export const stateCreator: StateCreator<StoreState> = (...args) => {
  const [set, get] = args;
  return {
    ...nodesStateCreator(...args),
    ...historyStateCreator(...args),
    ...audioPatchStateCreator(...args),
    ...projectStateCreator(...args),

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
    createNode: (nodeData) => {
      const { addNode, nodesConfiguration } = get();

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
        // @TODO: check this properly if it's about parent-child relationship
        ({ parentId }) => parentId && parentNodeIds.includes(parentId),
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
      setEdges(newEdges);
    },
    onConnect: async (connection) => {
      const { edges, createEdges } = get();
      const newEdges = addEdge(connection, edges);
      createEdges(newEdges);
    },
    onEdgesDelete: (edges) => {
      const { patch } = get();
    },
    onNodesDelete: async (nodes) => {
      const { removeNodesFromControlPanel, patch } = get();
      removeNodesFromControlPanel(nodes);
    },
    plugins: [],
    setPlugins: async (plugins) => {
      const { setNodeTypes } = get();
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
      const { getNodesAndEdges, controlPanel, viewport } = get();
      return {
        ...getNodesAndEdges(),
        controlPanel,
        viewport,
      };
    },
    setEditorState: async ({ nodes, edges, controlPanel, viewport }) => {
      const { setGraph } = get();
      await setGraph({ nodes, edges });
      // @TODO: remove this line once audio patch initialisation is reworked
      await new Promise((r) => setTimeout(r, 1000));
      set({
        controlPanel,
        viewport,
      });
    },
    isHelpShown: false,
    toggleHelp: () => {
      const { isHelpShown: showHelp } = get();
      set({ isHelpShown: !showHelp });
    },
    copyBuffer: { nodes: [], edges: [] },
    copy: (elements) => {
      set({ copyBuffer: elements });
    },
    copySelectedItems: () => {
      const { nodes: currentNodes, edges: currentEdges, copy } = get();
      const nodes = currentNodes.filter(({ selected }) => selected);
      const edges = currentEdges.filter(({ selected }) => selected);
      if (!nodes.length) {
        return;
      }
      copy({ nodes, edges });
    },
    pasteBuffer: (x = 0, y = 0) => {
      const { copyBuffer, createNodes, setEdges, nodes, edges } = get();
      const { nodes: nodesToCopy, edges: edgesToCopy } = copyBuffer;

      if (!nodesToCopy.length) {
        return;
      }

      set({
        nodes: nodes.map((node) => ({ ...node, selected: false })),
      });

      const topLeftNode = nodesToCopy.reduce((acc, node) => {
        if (!acc) {
          return node;
        }
        if (
          node.position.x < acc.position.x &&
          node.position.y < acc.position.y
        ) {
          return node;
        }
        return acc;
      });

      const xDelta = topLeftNode.position.x - x;
      const yDelta = topLeftNode.position.y - y;

      const { nodes: newNodes, mapping } = nodesToCopy.reduce(
        (acc, node) => {
          const newNodeId = generateNodeId(node);
          return {
            nodes: [
              ...acc.nodes,
              {
                ...node,
                id: newNodeId,
                position: {
                  x: node.position.x - xDelta,
                  y: node.position.y - yDelta,
                },
                selected: true,
              },
            ],
            mapping: {
              ...acc.mapping,
              [node.id]: newNodeId,
            },
          };
        },
        { nodes: [], mapping: {} } as {
          nodes: Array<WNNode>;
          mapping: Record<WNNode["id"], WNNode["id"]>;
        },
      );
      createNodes(newNodes);

      const newEdges = edgesToCopy.map((edge) => {
        const source = mapping[edge.source] || edge.source;
        const target = mapping[edge.target] || edge.target;
        return {
          ...edge,
          id: edge.id.replace(edge.source, source).replace(edge.target, target),
          source,
          target,
          selected: true,
        };
      });
      setEdges([
        ...edges.map((edge) => ({ ...edge, selected: false })),
        ...newEdges,
      ]);
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
      const sizeConfig = node.type
        ? nodesConfiguration[node.type]?.minSize
        : { height: undefined };
      const height = sizeConfig?.height;
      const newNode = {
        id: node.id,
        ...(height
          ? { height: height / CONTROL_PANEL_GRID_CONFIG.rowHeight }
          : {}),
      };
      set(({ controlPanel }) => ({
        controlPanel: {
          ...controlPanel,
          nodes: [...(controlPanel?.nodes || []), newNode],
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

    viewport: { x: 0, y: 0, zoom: 1 },
    setViewport: (viewport) => set({ viewport }),
  };
};

const useStore = create<StoreState>(audioPatch(history(stateCreator)));

export default useStore;
