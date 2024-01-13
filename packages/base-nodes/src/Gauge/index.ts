import { PluginComponent } from "@web-noise/core";
import Gauge from "./Gauge";
import node from "./Node";
import audioNode from "../ValueMeter/audioNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  type: "gauge",
  controlPanelNode: Gauge,
  node,
  audioNode,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
