import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "quantizer",
  audioNode,
  node: null,
};

export default plugin;
