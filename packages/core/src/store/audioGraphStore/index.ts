import type { StateCreator } from "zustand";
import type {
  CreateWNAudioNode,
  WNAudioNode,
  WNNode,
  WNEdge,
  InputPort,
  OutputPort,
} from "../../types";

export interface AudioNodeTypes
  extends Record<string, CreateWNAudioNode | false> {}

interface AudioNodeLoadingState {
  loading: true;
  error: null;
  node: null;
}

interface AudioNodeErrorState {
  loading: false;
  error: Error;
  node: null;
}

interface AudioNodeLoadedState<T> {
  loading: false;
  error: null;
  node: T;
}

export type AudioNodeState<T> =
  | AudioNodeLoadingState
  | AudioNodeErrorState
  | AudioNodeLoadedState<T>;

export interface AudioNodesState {
  audioNodeTypes: AudioNodeTypes;
  setAudioNodeTypes: (audioNodeTypes: AudioNodeTypes) => void;
  audioContext: AudioContext;
  audioNodes: Record<string, AudioNodeState<WNAudioNode>>;
  registerAudioNode: (node: WNNode) => Promise<void>;
  registerAudioNodes: (nodes: WNNode[]) => Promise<void>;
  unregisterAudioNode: (node: WNNode) => void;
  unregisterAudioNodes: (nodes: WNNode[]) => void;
  registerAudioConnection: (edge: WNEdge) => void;
  registerAudioConnections: (edges: WNEdge[]) => void;
  unregisterAudioConnection: (edge: WNEdge) => void;
  unregisterAudioConnections: (edges: WNEdge[]) => void;
  audioConnections: Record<string, { output: OutputPort; input: InputPort }>;
}

const audioNodesStateCreator: StateCreator<AudioNodesState> = (set, get) => ({
  audioNodeTypes: {},
  setAudioNodeTypes: (audioNodeTypes) => set({ audioNodeTypes }),
  audioContext: new AudioContext(),
  audioNodes: {},
  registerAudioNode: async ({ id, type, data }) => {
    if (!type) {
      set(({ audioNodes }) => ({
        audioNodes: {
          ...audioNodes,
          [id]: {
            loading: false,
            error: new Error(`Node: ${id} has no type`),
            node: null,
          },
        },
      }));
      return;
    }
    const { audioNodeTypes, audioContext } = get();
    const createNode = audioNodeTypes[type];
    if (createNode === false) {
      return;
    }
    if (!createNode) {
      set(({ audioNodes }) => ({
        audioNodes: {
          ...audioNodes,
          [id]: {
            loading: false,
            error: new Error(`Could not find handler for audio type ${type}`),
            node: null,
          },
        },
      }));
      return;
    }
    set(({ audioNodes }) => ({
      audioNodes: {
        ...audioNodes,
        [id]: {
          loading: true,
          error: null,
          node: null,
        },
      },
    }));
    try {
      const audioNode = await createNode(audioContext, data);
      set(({ audioNodes }) => ({
        audioNodes: {
          ...audioNodes,
          [id]: {
            loading: false,
            error: null,
            node: audioNode,
          },
        },
      }));
    } catch (error) {
      set(({ audioNodes }) => ({
        audioNodes: {
          ...audioNodes,
          [id]: {
            loading: false,
            error: error as Error,
            node: null,
          },
        },
      }));
    }
  },
  registerAudioNodes: async (nodes) => {
    const { registerAudioNode } = get();
    await Promise.all(nodes.map(registerAudioNode));
    return;
  },
  unregisterAudioNode: (props) => {
    const { id, data } = props;
    const { audioNodes } = get();
    const { [id]: audioNode, ...newAudioNodes } = audioNodes;
    if (!audioNode) {
      console.error(`Audio node #${id} does not exist`);
      return;
    }
    const { loading, error, node } = audioNode;

    if (loading) {
      console.error(`Audio node #${id} is yet not loaded`);
      return;
    }

    if (error) {
      console.error(`Audio node #${id} is in error state: ${error.toString()}`);
      return;
    }

    node.destroy && node.destroy();

    //disconnect all ports
    Object.values(node.inputs || {}).forEach(
      ({ port }) =>
        port instanceof AudioNode && port.disconnect && port.disconnect()
    );

    Object.values(node.outputs || {}).forEach(
      ({ port }) =>
        port instanceof AudioNode && port.disconnect && port.disconnect()
    );

    set({ audioNodes: newAudioNodes });
  },
  unregisterAudioNodes: (nodes) => {
    const { unregisterAudioNode } = get();
    nodes.map(unregisterAudioNode);
  },
  audioConnections: {},
  registerAudioConnection: (edge) => {
    const { audioNodes } = get();
    const { source, sourceHandle, target, targetHandle, id } = edge;
    const { node: sourceNode } = audioNodes[source] || {};
    if (!sourceNode) {
      console.error(`can't find source node ${sourceNode}`);
      return;
    }
    if (!sourceHandle) {
      console.error(`source handle is not defined in node ${sourceNode}`);
      return;
    }
    const outputNode = sourceNode.outputs?.[sourceHandle];
    const outputNodePort = outputNode?.port;

    const { node: targetNode } = audioNodes[target] || {};
    if (!targetNode) {
      console.error(`can't find target node ${targetNode}`);
      return;
    }
    if (!targetHandle) {
      console.error(`source handle is not defined in node ${sourceNode}`);
      return;
    }
    const inputNode = targetNode.inputs?.[targetHandle];
    const inputNodePort = inputNode?.port;

    if (!outputNodePort) {
      console.error(`Can't find output port: ${source}:${sourceHandle}`);
      return;
    }

    if (!inputNodePort) {
      console.error(`Can't find input port: ${target}:${targetHandle}`);
      return;
    }

    const isInputNode = inputNodePort instanceof AudioNode;
    const isInputParam = inputNodePort instanceof AudioParam;
    const isInputArray = inputNodePort instanceof Array;
    const isInputSimple = isInputNode || isInputParam;

    const isOutputNode = outputNodePort instanceof AudioNode;
    const isOutputArray = outputNodePort instanceof Array;

    if (isOutputNode && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNodePort.connect(inputNodePort);
    } else if (isOutputNode && isInputArray) {
      outputNodePort.connect(inputNodePort[0], 0, inputNodePort[1]);
    } else if (isOutputArray && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNodePort[0].connect(inputNodePort, outputNodePort[1]);
    } else if (isOutputArray && isInputArray) {
      outputNodePort[0].connect(
        inputNodePort[0],
        outputNodePort[1],
        inputNodePort[1]
      );
    } else {
      console.log(outputNodePort, inputNodePort);
      console.error(`ports can be only AudioNode or AudioNodeChannel`);
    }

    set(({ audioConnections }) => {
      return {
        audioConnections: {
          ...audioConnections,
          [id]: { output: outputNode, input: inputNode },
        },
      };
    });
  },
  registerAudioConnections: async (edges) => {
    const { registerAudioConnection } = get();
    edges.forEach(registerAudioConnection);
  },
  unregisterAudioConnection: (props) => {
    const { id, data } = props;
    const { audioConnections } = get();
    const { [id]: audioConnection, ...newAudioConnections } = audioConnections;
    if (!audioConnection) {
      console.error(`can't find connection in store for node id: ${id}`);
      return;
    }

    const {
      input: { port: inputNodePort },
      output: { port: outputNodePort },
    } = audioConnection;
    const isInputNode = inputNodePort instanceof AudioNode;
    const isInputParam = inputNodePort instanceof AudioParam;
    const isInputArray = inputNodePort instanceof Array;
    const isInputSimple = isInputNode || isInputParam;

    const isOutputNode = outputNodePort instanceof AudioNode;
    const isOutputArray = outputNodePort instanceof Array;

    if (isOutputNode && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNodePort.disconnect(inputNodePort);
    } else if (isOutputNode && isInputArray) {
      outputNodePort.disconnect(inputNodePort[0], 0, inputNodePort[1]);
    } else if (isOutputArray && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNodePort[0].disconnect(inputNodePort, outputNodePort[1]);
    } else if (isOutputArray && isInputArray) {
      outputNodePort[0].disconnect(
        inputNodePort[0],
        outputNodePort[1],
        inputNodePort[1]
      );
    } else {
      console.log(outputNodePort, inputNodePort);
      throw new Error(
        `output port can not be only AudioNode or AudioNodeChannel`
      );
    }
    set({ audioConnections: newAudioConnections });
  },
  unregisterAudioConnections: (edges) => {
    const { unregisterAudioConnection } = get();
    edges.map(unregisterAudioConnection);
  },
});

export default audioNodesStateCreator;
