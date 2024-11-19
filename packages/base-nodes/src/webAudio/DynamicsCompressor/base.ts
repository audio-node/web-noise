import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "dynamicsCompressor",
  node: null,
  audioNode,
};

export default plugin;
