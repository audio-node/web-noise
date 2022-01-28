import { createContext, useContext } from "react";

type DeviceID = string;
type AudioNode = any;
class EditorDevice {
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
  connect(inputId: DeviceID, outputId: DeviceID) {
    const input = this.getNode(inputId);
    const output = this.getNode(outputId);
    input.connect(output);
  }
}

export const contextValue = {
  audioContext: new AudioContext(),
  device: new EditorDevice(),
};

//@ts-ignore
window.contextValue = contextValue;

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
