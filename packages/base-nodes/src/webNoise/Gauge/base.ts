import { PluginComponent } from "@web-noise/core";
import audioNode from "../ValueMeter/audioNode";

const plugin: PluginComponent = {
  type: "gauge",
  audioNode,
  node: null,
};

export default plugin;
