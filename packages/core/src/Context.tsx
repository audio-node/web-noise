import { createContext, useContext, useState, useEffect } from "react";
type AudioNodeChannel = [AudioNode, number];

interface InputPort {
  port: AudioNode | AudioNodeChannel | AudioParam;
}

interface OutputPort {
  port: AudioNode | AudioNodeChannel;
}

export interface Node extends Record<string, any> {
  inputs?: Record<string, InputPort | never>;
  outputs?: Record<string, OutputPort | never>;
  destroy?: () => void;
  setValues?: (values?: any) => void;
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

    module.delete(id);
  };

  const getNodePort = async (
    id: string,
    type: "inputs" | "outputs",
    portId: string
  ): Promise<AudioNode | AudioParam | AudioNodeChannel | undefined> => {
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

    const isInputNode = inputNode instanceof AudioNode;
    const isInputParam = inputNode instanceof AudioParam;
    const isInputArray = inputNode instanceof Array;
    const isInputSimple = isInputNode || isInputParam;

    const isOutputNode = outputNode instanceof AudioNode;
    const isOutputArray = outputNode instanceof Array;

    if (isOutputNode && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNode.connect(inputNode);
    } else if (isOutputNode && isInputArray) {
      outputNode.connect(inputNode[0], 0, inputNode[1]);
    } else if (isOutputArray && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNode[0].connect(inputNode, outputNode[1]);
    } else if (isOutputArray && isInputArray) {
      outputNode[0].connect(inputNode[0], outputNode[1], inputNode[1]);
    } else {
      console.log(outputNode, inputNode);
      throw new Error(
        `output port can not be only AudioNode or AudioNodeChannel: ${sourceId}:${sourcePort}`
      );
    }

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

    const isInputNode = inputNode instanceof AudioNode;
    const isInputParam = inputNode instanceof AudioParam;
    const isInputArray = inputNode instanceof Array;
    const isInputSimple = isInputNode || isInputParam;

    const isOutputNode = outputNode instanceof AudioNode;
    const isOutputArray = outputNode instanceof Array;

    if (isOutputNode && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNode.disconnect(inputNode);
    } else if (isOutputNode && isInputArray) {
      outputNode.disconnect(inputNode[0], 0, inputNode[1]);
    } else if (isOutputArray && isInputSimple) {
      //@ts-ignore inputNode can actually be AudioParam
      outputNode[0].disconnect(inputNode, outputNode[1]);
    } else if (isOutputArray && isInputArray) {
      outputNode[0].disconnect(inputNode[0], outputNode[1], inputNode[1]);
    } else {
      console.log(outputNode, inputNode);
      throw new Error(
        `output port can not be only AudioNode or AudioNodeChannel: ${sourceId}:${sourcePort}`
      );
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

interface NodeLoadingState {
  loading: true;
  error: null;
  node: null;
}

interface NodeErrorState {
  loading: false;
  error: Error;
  node: null;
}

interface NodeLoadedState<T> {
  loading: false;
  error: null;
  node: T;
}

type UseNode<T> = NodeLoadingState | NodeErrorState | NodeLoadedState<T>;

export const useNode = <T extends Node>(id: string): UseNode<T> => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [node, setNode] = useState<T | null>(null);

  const { getNode } = useModule();

  useEffect(() => {
    const nodePromise = getNode<T | Promise<T>>(id);
    if (!nodePromise) {
      setLoading(false);
      setError(new Error(`could not find node with id: ${id}`));
      return;
    }

    Promise.resolve(nodePromise)
      .then((result) => {
        setNode(result);
        setLoading(false);
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  }, [getNode, id, setNode, setLoading, setError]);

  if (loading === true) {
    return {
      node: null,
      error: null,
      loading: true,
    };
  }

  if (error) {
    return {
      node: null,
      loading: false,
      error,
    };
  }

  return { node: node as T, loading: false, error: null };
};
