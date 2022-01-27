import { createContext, useContext } from "react";

export const contextValue = {
  audioContext: new AudioContext(),
};

export const EditorContext = createContext(contextValue);

export const useEditorContext = () => useContext(EditorContext);
