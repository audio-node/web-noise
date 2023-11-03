import { PluginComponent } from "@web-noise/core";
import Patch from "./Patch";
import patchNode from "./patchAudioNode";

const plugin: PluginComponent = {
  type: "patch",
  node: Patch,
  audioNode: patchNode,
};

export default plugin;
