import { PluginComponent } from "@web-noise/core";
import Spectroscope from "./Spectroscope";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  type: "spectroscope",
  controlPanelNode: Spectroscope,
  node,
  audioNode,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
