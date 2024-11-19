import { type PluginComponent } from "@web-noise/core";
import Oscilloscope from "./Oscilloscope";
import node from "./Node";
import base from "./base";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Oscilloscope,
  node,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
