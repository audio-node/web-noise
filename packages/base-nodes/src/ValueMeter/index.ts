import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./ValueMeter";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "valueMeter",
  controlPanelNode,
  node,
  audioNode,
};

export default plugin;
