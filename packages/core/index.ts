import Editor, {
  PluginConfig,
  PluginComponent,
  Elements,
} from "./src/components/Editor";
import Wire from "./src/components/Wire";
import { WNNode, TitleBar, WNNodeProps } from "./src/components/Node";
import Modal from "./src/components/Modal";
import useAudioNode from "./src/hooks/useAudioNode";
import useNode from "./src/hooks/useNode";
import useTheme from "./src/hooks/useTheme";
import useStore from "./src/store";
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
};

export {
  theme,
  Editor,
  Modal,
  Wire,
  WNNode,
  TitleBar,
  useAudioNode,
  useNode,
  useTheme,
  useStore,
};
