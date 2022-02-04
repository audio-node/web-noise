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
const module: Record<string, Node | never> = {};

export const contextValue = {
  audioContext: new AudioContext(),
  module,
};

//@ts-ignore
window.contextValue = contextValue;

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
