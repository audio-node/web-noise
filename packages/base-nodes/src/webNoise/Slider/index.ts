import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Slider from "./Slider";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from './defaultConfig'

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Slider,
  node,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
