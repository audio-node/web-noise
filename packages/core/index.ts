export { default as Editor } from "./src/components/App";
export { default as Wire } from "./src/components/Wire";
export {
  WNNode,
  TitleBar,
  type WNNodeProps,
  PortsPanel,
  OutputPorts,
  OutputHandle,
  InputPorts,
  InputHandle,
  Port,
} from "./src/components/Node";
export { default as Modal } from "./src/components/Modal";
export { default as EditableLabel } from "./src/components/EditableLabel";
export { default as useAudioNode } from "./src/hooks/useAudioNode";
export { default as useNode } from "./src/hooks/useNode";
export { default as useTheme } from "./src/hooks/useTheme";
export { default as useStore } from "./src/store";
export { default as theme } from "./src/theme";

export type {
  WNAudioNode,
  CreateWNAudioNode,
  ControlPanelNodeProps,
  PluginConfig,
  PluginComponent,
  ControlPanelNode,
  WNNodeData,
  WNNode as TWNNode,
  InputPort,
  OutputPort,
  EditorState,
  Project,
  WNEdge as TWNEdge,
  EditorStoreState,
} from "./src/types";
export type { Theme } from "./src/theme";
