import { PluginComponent } from "@web-noise/core";
import Filter from "./Filter";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Filter,
  node,
};

export default plugin;
