import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Gauge from "./Gauge";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Gauge,
  node,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;