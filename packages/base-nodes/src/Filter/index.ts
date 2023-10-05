import { PluginComponent } from "@web-noise/core";
import Filter from "./Filter";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "filter",
  controlPanelNode: Filter,
  node,
  audioNode,
};

export default plugin;
