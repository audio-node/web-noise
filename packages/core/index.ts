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
import NumberInput from "./src/components/NumberInput";
import useAudioNode from "./src/hooks/useAudioNode";
import useNode from "./src/hooks/useNode";
import useTheme from "./src/hooks/useTheme";
import useStore, { EditorState } from "./src/store";
import theme from "./src/theme";
import type { WNAudioNode, CreateWNAudioNode, WNNodeData } from "./src/types";
import type { Theme } from "./src/theme";

export type {
  WNAudioNode,
  WNNodeProps,
  WNNodeData,
  CreateWNAudioNode,
  Theme,
  Elements,
  PluginConfig,
  PluginComponent,
  EditorState,
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
  NumberInput,
  useAudioNode,
  useNode,
  useTheme,
  useStore,
};
