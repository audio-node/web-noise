import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./MathNode";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
};

export default plugin;
