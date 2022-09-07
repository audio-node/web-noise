import { useContext } from "react";
import { ModuleContext } from '../Context';
import type { WNAudioNode, AudioNodeChannel } from '../types';

const useModule = () => {
  const { module, audioContext, connections } = useContext(ModuleContext);

  const registerNode = (id: string, node: WNAudioNode) => {
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

  const getNode = <T extends WNAudioNode>(id: string): T | undefined => {
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

export default useModule;
