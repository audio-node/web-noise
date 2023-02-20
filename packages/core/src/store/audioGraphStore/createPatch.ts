import type {
  CreateWNAudioNode,
  WNAudioNode,
  WNNode,
  WNEdge,
  InputPort,
  OutputPort,
} from "../../types";
import { AudioNodeTypes, AudioNodeState } from ".";

type AudioNodes = Map<string, AudioNodeState<WNAudioNode>>;
type RegisterAudioNode = (node: WNNode) => Promise<void>;
type RegisterAudioNodes = (nodes: WNNode[]) => Promise<void>[];

type AudioConnections = Map<string, { output: OutputPort; input: InputPort }>;
type RegisterAudioConnection = (edge: WNEdge) => void;
type RegisterAudioConnections = (edge: WNEdge[]) => void[];

interface Patch {
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

const createPatch = (
  audioContext: AudioContext,
  audioNodeTypes: AudioNodeTypes
): Patch => {
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
    const createNode = audioNodeTypes[type];
    if (createNode === false) {
      return;
    }
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
      //@ts-ignore
      const audioNode = await createNode(audioContext, data, audioNodeTypes);
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

  const registerAudioNodes: RegisterAudioNodes = (nodes) => {
    return nodes.map(registerAudioNode);
  };

  const registerAudioConnection: RegisterAudioConnection = (edge) => {
    const { source, sourceHandle, target, targetHandle, id } = edge;
    const { node: sourceNode } = audioNodes.get(source) || {};

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
        inputNodePort[1]
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

  return {
    audioNodes,
    registerAudioNode,
    registerAudioNodes,
    unregisterAudioNode: (node) => {},
    unregisterAudioNodes: (nodes) => {},
    audioConnections,
    registerAudioConnection,
    registerAudioConnections,
    unregisterAudioConnection: (edge) => {},
    unregisterAudioConnections: (edges) => {},
  };
};

export default createPatch;
