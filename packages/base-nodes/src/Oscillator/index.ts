import { PluginComponent } from "@web-noise/core";
import Oscillator from "./Oscillator";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "oscillator",
  controlPanelNode: Oscillator,
  node,
  audioNode,
};

export default plugin;
