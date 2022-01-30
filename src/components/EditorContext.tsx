import { createContext, useContext } from "react";
import { BaseAudioNode, context } from "../node";

type DeviceID = string;

class Rack extends BaseAudioNode {
  private nodes = new Map<DeviceID, AudioNode>();
  addNode(id: DeviceID, node: AudioNode) {
    return this.nodes.set(id, node);
  }
  removeNode(id: DeviceID) {
    return this.nodes.delete(id);
  }
  getNode(id: DeviceID) {
    return this.nodes.get(id);
  }
  connect(outputId: DeviceID, inputId: DeviceID) {
    const input = this.getNode(inputId);
    const output = this.getNode(outputId);
    if (input === undefined) {
      throw new Error("input is undefined");
    }
    if (output === undefined) {
      throw new Error("output is undefined");
    }
    input.connect(output);
  }
}

export const contextValue = {
  audioContext: context,
  device: new Rack(),
};

//@ts-ignore
window.contextValue = contextValue;

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
