import { CodeEditor } from "./src/levaPlugins";
import { ModuleContext, contextValue } from "./src/Context";
import Wire from "./src/components/Wire";
import AudioGraph from "./src/components/AudioGraph";
import ResumeContext from "./src/components/ResumeContext";
import ContextMenu from "./src/components/ContextMenu";
import useAudioNode from "./src/hooks/useAudioNode";
import useModule from "./src/hooks/useModule";
import useNode from "./src/hooks/useNode";
import useTheme from "./src/hooks/useTheme";
import theme from "./src/theme";
import type { WNAudioNode } from "./src/types";
import type { Theme } from "./src/theme";

const plugins = {
  CodeEditor,
};

export type { WNAudioNode, Theme };

export {
  plugins,
  theme,
  contextValue,
  ModuleContext,
  AudioGraph,
  ResumeContext,
  ContextMenu,
  Wire,
  useAudioNode,
  useModule,
  useNode,
  useTheme,
};
