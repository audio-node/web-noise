import { createContext, useContext, useEffect, useMemo } from "react";

interface InputPort {
  port: AudioNode | any /* any other type of port */;
}

interface OutputPort {
  port: AudioNode;
}

export interface Node extends Record<string, any> {
  inputs?: Record<string, InputPort | never>;
  outputs?: Record<string, OutputPort | never>;
}
const module: Map<string, Node | Promise<Node>> = new Map();
const connections: Map<string, true> = new Map();

const audioContext = new AudioContext();

export const contextValue = {
  audioContext,
  module,
  connections,
};

export const ModuleContext = createContext(contextValue);

export const useModule = () => {
  const { module, audioContext } = useContext(ModuleContext);

  const registerNode = (id: string, node: Node) => {
    module.set(id, node);
  };

  const unregisterNode = async (id: string) => {
    const node = await module.get(id);
    if (!node) {
      console.error(`can't find node with id: ${id}`);
      return;
    }

    //disconnect all ports
    Object.values(node.inputs || {}).forEach(
      ({ port }) => port.disconnect && port.disconnect()
    );

    Object.values(node.outputs || {}).forEach(
      ({ port }) => port.disconnect && port.disconnect()
    );

    module.delete(id);
  };

  const getNodePort = async (
    id: string,
    type: "inputs" | "outputs",
    portId: string
  ): Promise<AudioNode> => {
    return (await module.get(id))?.[type]?.[portId]?.port;
  };

  const getNode = <T extends Node>(id: string): T | undefined => {
    //@ts-ignore
    return module.get(id);
  };

  const connect = async (
    [sourceId, sourcePort]: [string, string],
    [targetId, targetPort]: [string, string]
  ) => {
    const [outputNode, inputNode] = await Promise.all([
      getNodePort(sourceId, "outputs", sourcePort),
      getNodePort(targetId, "inputs", targetPort),
    ]);

    if (!outputNode) {
      console.error(`could not find output port ${sourceId}:${sourcePort}`);
      return false;
    }

    if (!inputNode) {
      console.error(`could not find input port ${targetId}:${targetPort}`);
      return false;
    }

    outputNode.connect(inputNode);

    connections.set(
      [sourceId, sourcePort, targetId, targetPort].join(":"),
      true
    );
    return true;
  };

  const disconnect = async (
    [sourceId, sourcePort]: [string, string],
    [targetId, targetPort]: [string, string]
  ) => {
    const [outputNode, inputNode] = await Promise.all([
      getNodePort(sourceId, "outputs", sourcePort),
      getNodePort(targetId, "inputs", targetPort),
    ]);

    if (!outputNode) {
      console.error(`could not find output port ${targetId}:${targetPort}`);
      return;
    }

    if (!inputNode) {
      console.error(`could not find input port ${sourceId}:${sourcePort}`);
      return;
    }

    try {
      outputNode.disconnect(inputNode);
    } catch (e) {
      console.error(`error disconnecting`, e);
    }
    connections.delete([sourceId, sourcePort, targetId, targetPort].join(":"));
  };

  const destroy = async () => {
    //@ts-ignore
    const connectionNames = [...connections.keys()];
    await Promise.all(
      connectionNames.map((name) => {
        const [sourceId, sourcePort, targetId, targetPort] = name.split(":");
        return disconnect([sourceId, sourcePort], [targetId, targetPort]);
      })
    );

    //@ts-ignore
    const ids = [...module.keys()];
    await Promise.all(ids.map((id) => unregisterNode(id)));
    return true;
  };

  return {
    audioContext,
    registerNode,
    unregisterNode,
    getNode,
    connect,
    disconnect,
    destroy,
  };
};

export const useNode = <T,>(
  id: string
): { node: T | undefined; ready: boolean } => {
  const { getNode } = useModule();

  const node = getNode<T>(id);

  //@ts-ignore
  return { node, ready: true };
};
