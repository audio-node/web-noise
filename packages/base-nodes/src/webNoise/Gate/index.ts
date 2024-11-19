import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./Gate";
import node from "./GateNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const Gate: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  configNode,
  defaultConfig,
  resizable: true,
};

export default Gate;
