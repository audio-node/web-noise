import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "scale",
  audioNode,
  node: null,
};

export default plugin;
