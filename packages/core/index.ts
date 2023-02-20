import Editor, {
  PluginConfig,
  PluginComponent,
  Elements,
} from "./src/components/Editor";
import Wire from "./src/components/Wire";
import {
  WNNode,
  TitleBar,
  TitleBarLabel,
  WNNodeProps,
  PortsPanel,
  OutputPorts,
  OutputHandle,
  InputPorts,
  InputHandle,
  Port,
} from "./src/components/Node";
import Modal from "./src/components/Modal";
import useAudioNode from "./src/hooks/useAudioNode";
import useNode from "./src/hooks/useNode";
import useTheme from "./src/hooks/useTheme";
import useStore, { EditorState } from "./src/store";
import createPatch from "./src/store/audioGraphStore/createPatch";
import theme from "./src/theme";
import type {
  WNAudioNode,
  CreateWNAudioNode,
  ControlPanelNodeProps,
  ControlPanelNode,
  WNNodeData,
  WNNode as TWNNode,
  InputPort,
  OutputPort,
} from "./src/types";
import type { Theme } from "./src/theme";

export type {
  WNAudioNode,
  TWNNode,
  WNNodeProps,
  WNNodeData,
  CreateWNAudioNode,
  ControlPanelNodeProps,
  ControlPanelNode,
  Theme,
  Elements,
  PluginConfig,
  PluginComponent,
  EditorState,
  InputPort,
  OutputPort,
};

export {
  theme,
  Editor,
  Modal,
  Wire,
  WNNode,
  TitleBar,
  TitleBarLabel,
  PortsPanel,
  OutputPorts,
  OutputHandle,
  InputPorts,
  InputHandle,
  Port,
  useAudioNode,
  useNode,
  useTheme,
  useStore,
  createPatch,
};
