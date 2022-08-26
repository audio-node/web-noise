import { CodeEditor, iconsGroup } from "./src/levaPlugins";
import { ModuleContext, contextValue } from "./src/Context";
import Editor, {
  PluginConfig,
  PluginComponent,
  Elements,
} from "./src/components/Editor";
import Wire from "./src/components/Wire";
import AudioGraph from "./src/components/AudioGraph";
import ResumeContext from "./src/components/ResumeContext";
import ContextMenu from "./src/components/ContextMenu";
import { WNNode, TitleBar, WNNodeProps, WNNodeData } from "./src/components/Node";
import useAudioNode from "./src/hooks/useAudioNode";
import useModule from "./src/hooks/useModule";
import useNode from "./src/hooks/useNode";
import useTheme from "./src/hooks/useTheme";
import theme from "./src/theme";
import type { WNAudioNode, CreateWNAudioNode } from "./src/types";
import type { Theme } from "./src/theme";

const plugins = {
  CodeEditor,
  iconsGroup,
};

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
  plugins,
  theme,
  contextValue,
  Editor,
  ModuleContext,
  AudioGraph,
  ResumeContext,
  ContextMenu,
  Wire,
  WNNode,
  TitleBar,
  useAudioNode,
  useModule,
  useNode,
  useTheme,
};
