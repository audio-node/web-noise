import { PluginComponent } from "@web-noise/core";
import containerNode from "./containerNode";
import Patch from "./Patch";
import patchNode from "./patchAudioNode";

const plugin: PluginComponent = {
  type: "patch",
  node: Patch,
  audioNode: patchNode,
  containerNode,
};

export default plugin;
