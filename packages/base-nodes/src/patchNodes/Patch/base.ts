import type { PluginComponent } from "@web-noise/core";
import patchNode from "./patchAudioNode";

const plugin: PluginComponent = {
  type: "patch",
  node: null,
  audioNode: patchNode,
};

export default plugin;
