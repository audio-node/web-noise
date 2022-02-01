import { createContext, useContext } from "react";
import { BaseAudioNode } from "../node";

type NodeID = string;
interface ConnectParam {
  id: NodeID;
  port: number;
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

    const outputSource = outputNode?.outputs[outputPort].node;
    const inputSource = inputNode?.inputs[inputPort].node;
    if (typeof outputSource === undefined) {
      throw new Error("outputSource is undefined");
    }
    if (typeof inputSource === undefined) {
      throw new Error("inputSource is undefined");
    }

    /*
     * ts thinks inputSource and outputSource can be undefined
     * despite the check above, casting force defined
     * */
    //@ts-ignore
    outputSource!.connect(inputSource!); //in web audio we connect out to in :(
  }
}

export const contextValue = {
  module: new AudioModule(),
};

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
