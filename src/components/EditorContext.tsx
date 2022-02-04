import { createContext, useContext } from "react";

const module: Record<string, AudioNode | never> = {};

export const contextValue = {
  audioContext: new AudioContext(),
  module,
};

//@ts-ignore
window.contextValue = contextValue;

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
