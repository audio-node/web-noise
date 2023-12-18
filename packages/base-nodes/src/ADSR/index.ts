import { PluginComponent } from "@web-noise/core";
import ADSR from "./ADSR";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  type: "adsr",
  controlPanelNode: ADSR,
  node,
  audioNode,
  configNode,
  resizable: true,
  defaultConfig,
};

export default plugin;
