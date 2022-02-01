import { createContext, useContext } from "react";
import { BaseAudioNode } from "../node";

type NodeID = string;
interface ConnectParam {
  id: NodeID;
  port: string;
}

class AudioModule extends BaseAudioNode {
  private nodes = new Map<NodeID, BaseAudioNode>();
  addNode(id: NodeID, node: BaseAudioNode) {
    return this.nodes.set(id, node);
  }
  removeNode(id: NodeID) {
    return this.nodes.delete(id);
  }
  getNode(id: NodeID) {
    return this.nodes.get(id);
  }
  connect(
    { id: outputId, port: outputPort }: ConnectParam,
    { id: inputId, port: inputPort }: ConnectParam
  ) {
    const outputNode = this.getNode(outputId);
    const inputNode = this.getNode(inputId);

    const outputSource = outputNode?.outputs[outputPort]?.node;
    const inputSource = inputNode?.inputs[inputPort]?.node;

    if (typeof outputSource === "undefined") {
      console.error("outputSource is undefined");
      return;
    }
    if (typeof inputSource === "undefined") {
      console.error("inputSource is undefined");
      return;
    }

    /*
     * ts thinks inputSource and outputSource can be undefined
     * despite the check above, casting force defined
     * */
    //@ts-ignore
    outputSource!.connect(inputSource!);
  }
}

export const contextValue = {
  module: new AudioModule(),
};

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
