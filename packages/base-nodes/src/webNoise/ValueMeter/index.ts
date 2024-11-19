import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./ValueMeter";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode,
  node,
};

export default plugin;
