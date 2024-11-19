import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./Select";
import node from "./SelectNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";
import base from "./base";

export const Select: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  configNode,
  defaultConfig,
};

export default Select;

