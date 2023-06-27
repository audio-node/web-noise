import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./Select";
import node from "./SelectNode";
import audioNode from "./audioNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

export const Select: PluginComponent = {
  type: "select",
  node,
  audioNode,
  controlPanelNode,
  configNode,
  defaultConfig,
};
