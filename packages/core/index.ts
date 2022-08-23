import { CodeEditor } from "./src/levaPlugins";
import { ModuleContext, contextValue } from "./src/Context";
import Wire from "./src/components/Wire";
import useAudioNode from "./src/hooks/useAudioNode";
import useModule from "./src/hooks/useModule";
import useNode from "./src/hooks/useNode";
import type { WNAudioNode } from "./src/types";

const plugins = {
  CodeEditor,
};

export type { WNAudioNode };

export {
  plugins,
  contextValue,
  ModuleContext,
  Wire,
  useAudioNode,
  useModule,
  useNode,
};
