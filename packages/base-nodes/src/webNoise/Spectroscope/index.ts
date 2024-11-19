import { PluginComponent } from "@web-noise/core";
import Spectroscope from "./Spectroscope";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: Spectroscope,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
