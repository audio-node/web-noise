import { createContext, useContext } from "react";

interface InputPort {
  port: AudioNode | any /* any other type of port */;
}

interface OutputPort {
  port: AudioNode;
}

interface Node extends Record<string, any> {
  inputs?: Record<string, InputPort | never>;
  outputs?: Record<string, OutputPort | never>;
}
const module: Map<string, Node> = new Map();

const audioContext = new AudioContext();

export const contextValue = {
  audioContext,
  module,
};

export const ModuleContext = createContext(contextValue);

export const useModule = () => {
  const { module, audioContext } = useContext(ModuleContext);

  const registerNode = (id: string, node: Node) => {
    module.set(id, node);
  };

  const unregisterNode = (id: string) => {
    //disconnect all ports
    const node = module.get(id);
    if (!node) {
      console.error(`can't find node with id: ${id}`);
      return;
    }
    Object.values(node.inputs || {}).forEach(
      ({ port }) => port.disconnect && port.disconnect()
    );
    Object.values(node.outputs || {}).forEach(
      ({ port }) => port.disconnect && port.disconnect()
    );

    module.delete(id);
  };

  const getNodePort = (
    id: string,
    type: "inputs" | "outputs",
    portId: string
  ) => {
    return module.get(id)?.[type]?.[portId]?.port;
  };

  const connect = (
    [sourceId, sourcePort]: [string, string],
    [targetId, targetPort]: [string, string]
  ) => {
    const outputNode = getNodePort(sourceId, "outputs", sourcePort);
    if (!outputNode) {
      console.error(`could not find output port ${targetId}:${targetPort}`);
      return false;
    }

    const inputNode = getNodePort(targetId, "inputs", targetPort);
    if (!inputNode) {
      console.error(`could not find input port ${sourceId}:${sourcePort}`);
      return false;
    }

    outputNode.connect(inputNode);
    return true;
  };

  const disconnect = (
    [sourceId, sourcePort]: [string, string],
    [targetId, targetPort]: [string, string]
  ) => {
    const outputNode = getNodePort(sourceId, "outputs", sourcePort);
    if (!outputNode) {
      console.error(`could not find output port ${targetId}:${targetPort}`);
      return;
    }

    const inputNode = getNodePort(targetId, "inputs", targetPort);
    if (!inputNode) {
      console.error(`could not find input port ${sourceId}:${sourcePort}`);
      return;
    }

    outputNode.disconnect(inputNode);
  };

  return {
    audioContext,
    registerNode,
    unregisterNode,
    connect,
    disconnect,
  };
};
