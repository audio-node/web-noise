import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./ADSR";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  configNode,
  resizable: true,
  defaultConfig,
};

export default plugin;
