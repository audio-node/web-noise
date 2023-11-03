import type {
  InputPort,
  OutputPort,
  WNAudioNode,
  TWNEdge as WNEdge,
  TWNNode as WNNode,
} from "@web-noise/core";

import { getAudioNodeType } from "./audioNodeTypes";

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

type AudioNodes = Map<string, AudioNodeState<WNAudioNode>>;
type RegisterAudioNode = (node: WNNode) => Promise<void>;
type RegisterAudioNodes = (nodes: WNNode[]) => Promise<void[]>;
type UnregisterAudioNode = (node: WNNode) => void;
type UnregisterAudioNodes = (node: WNNode[]) => void;

type AudioConnections = Map<string, { output: OutputPort; input: InputPort }>;
type RegisterAudioConnection = (edge: WNEdge) => void;
type RegisterAudioConnections = (edge: WNEdge[]) => void[];
type UnregisterAudioConnection = (edge: WNEdge) => void;
type UnregisterAudioConnections = (edge: WNEdge[]) => void[];

export interface Patch {
  audioContext: AudioContext;
  audioNodes: AudioNodes;
  registerAudioNode: RegisterAudioNode;
  registerAudioNodes: RegisterAudioNodes;
  unregisterAudioNode: (node: WNNode) => void;
  unregisterAudioNodes: (nodes: WNNode[]) => void;
  audioConnections: AudioConnections;
  registerAudioConnection: RegisterAudioConnection;
  registerAudioConnections: RegisterAudioConnections;
  unregisterAudioConnection: (edge: WNEdge) => void;
  unregisterAudioConnections: (edges: WNEdge[]) => void;
}

type CreatePatch = (audioContext?: AudioContext) => Patch;

const createPatch: CreatePatch = (audioContext = new AudioContext()) => {
  const audioNodes: AudioNodes = new Map();
  const audioConnections: AudioConnections = new Map();

  const registerAudioNode: RegisterAudioNode = async (node) => {
    const { id, type, data } = node;
    if (!type) {
      audioNodes.set(id, {
        loading: false,
        error: new Error(`Node: ${id} has no type`),
        node: null,
      });
      return;
    }
    const nodeCreator = getAudioNodeType(type);
    if (nodeCreator === false) {
      return;
    }
    const createNode = nodeCreator;
    if (!createNode) {
      audioNodes.set(id, {
        loading: false,
        error: new Error(`Could not find handler for audio type ${type}`),
        node: null,
      });
      return;
    }
    audioNodes.set(id, {
      loading: true,
      error: null,
      node: null,
    });
    try {
      const audioNode = await createNode(audioContext, data);
      audioNodes.set(id, {
        loading: false,
        error: null,
        node: audioNode,
      });
    } catch (error) {
      audioNodes.set(id, {
        loading: false,
        error: error as Error,
        node: null,
      });
    }
  };

  const registerAudioNodes: RegisterAudioNodes = async (nodes) => {
    return Promise.all(nodes.map(registerAudioNode));
  };

  const unregisterAudioNode: UnregisterAudioNode = (props) => {
    const { id, data } = props;
    const audioNode = audioNodes.get(id);
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
        port instanceof AudioNode && port.disconnect && port.disconnect(),
    );

    Object.values(node.outputs || {}).forEach(
      ({ port }) =>
        port instanceof AudioNode && port.disconnect && port.disconnect(),
    );

    audioNodes.delete(id);
  };

  const unregisterAudioNodes: UnregisterAudioNodes = (nodes) => {
    return nodes.map(unregisterAudioNode);
  };

  const registerAudioConnection: RegisterAudioConnection = (edge) => {
    const { source, sourceHandle, target, targetHandle, id } = edge;
    const { node: sourceNode } = audioNodes.get(source) || {};

    if (!sourceNode) {
      console.error(`can't find source node ${source}`);
      return;
    }
    if (!sourceHandle) {
      console.error(`source handle is not defined in node ${source}`);
      return;
    }
    const outputNode = sourceNode.outputs?.[sourceHandle];
    const outputNodePort = outputNode?.port;

    const { node: targetNode } = audioNodes.get(target) || {};
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
        inputNodePort[1],
      );
    } else {
      console.log(outputNodePort, inputNodePort);
      console.error(`ports can be only AudioNode or AudioNodeChannel`);
    }

    audioConnections.set(id, { output: outputNode, input: inputNode });
  };

  const registerAudioConnections: RegisterAudioConnections = (edges) => {
    return edges.map(registerAudioConnection);
  };

  const unregisterAudioConnection: UnregisterAudioConnection = (edge) => {
    const { id, data } = edge;
    const audioConnection = audioConnections.get(id);
    if (!audioConnection) {
      console.error(`can't find connection with id: ${id}`);
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
        inputNodePort[1],
      );
    } else {
      console.log(outputNodePort, inputNodePort);
      throw new Error(
        `output port can not be only AudioNode or AudioNodeChannel`,
      );
    }
    audioConnections.delete(id);
  };

  const unregisterAudioConnections: UnregisterAudioConnections = (edges) => {
    return edges.map(unregisterAudioConnection);
  };

  return {
    audioContext,
    audioNodes,
    registerAudioNode,
    registerAudioNodes,
    unregisterAudioNode,
    unregisterAudioNodes,
    audioConnections,
    registerAudioConnection,
    registerAudioConnections,
    unregisterAudioConnection,
    unregisterAudioConnections,
  };
};

export default createPatch;
