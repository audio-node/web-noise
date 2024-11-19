import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./RandomSequencer";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  defaultConfig: {},
};

export default plugin;
