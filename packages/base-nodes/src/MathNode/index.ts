import { PluginComponent } from "@web-noise/core";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "mathNode",
  node,
  audioNode,
};

export default plugin;
