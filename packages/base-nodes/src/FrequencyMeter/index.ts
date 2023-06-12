import { PluginComponent, WNNode } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "frequencyMeter",
  node: WNNode,
  audioNode,
};

export default plugin;
