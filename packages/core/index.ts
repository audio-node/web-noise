import { CodeEditor } from "./src/levaPlugins";
import { ModuleContext, contextValue } from "./src/Context";
import Editor, { EditorConfig, Elements } from "./src/components/Editor";
import Wire from "./src/components/Wire";
import AudioGraph from "./src/components/AudioGraph";
import ResumeContext from "./src/components/ResumeContext";
import ContextMenu from "./src/components/ContextMenu";
import { Node, TitleBar } from "./src/components/Node";
import useAudioNode from "./src/hooks/useAudioNode";
import useModule from "./src/hooks/useModule";
import useNode from "./src/hooks/useNode";
import useTheme from "./src/hooks/useTheme";
import theme from "./src/theme";
import type { WNAudioNode, CreateWNAudioNode } from "./src/types";
import type { Theme } from "./src/theme";

const plugins = {
  CodeEditor,
};

export type { WNAudioNode, CreateWNAudioNode, Theme, EditorConfig, Elements };

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
  Node,
  TitleBar,
  useAudioNode,
  useModule,
  useNode,
  useTheme,
};
