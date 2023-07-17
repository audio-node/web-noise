import { PluginComponent } from "@web-noise/core";
import Oscilloscope from "./Oscilloscope";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  type: "oscilloscope",
  controlPanelNode: Oscilloscope,
  node,
  audioNode,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
