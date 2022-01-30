import { createContext, useContext } from "react";
import { BaseAudioNode } from "../node";

type DeviceID = string;
type AudioNode = any;

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
    input.connect(output);
  }
}

const audioContext = new AudioContext();

export const contextValue = {
  audioContext,
  device: new Rack(),
};

//@ts-ignore
window.contextValue = contextValue;

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
