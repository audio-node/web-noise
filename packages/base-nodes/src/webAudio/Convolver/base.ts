import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "convolver",
  node: null,
  audioNode,
};

export default plugin;
