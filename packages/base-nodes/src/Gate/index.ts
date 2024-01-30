import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./Gate";
import node from "./GateNode";
import audioNode from "./audioNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const Gate: PluginComponent = {
  type: "gate",
  node,
  audioNode,
  controlPanelNode,
  configNode,
  defaultConfig,
  resizable: true,
};

export { Gate };
