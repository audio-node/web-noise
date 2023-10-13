import { PluginComponent } from "@web-noise/core";
import Slider from "./Slider";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";
import defaultConfig from './defaultConfig'

const plugin: PluginComponent = {
  type: "slider",
  controlPanelNode: Slider,
  node,
  audioNode,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
