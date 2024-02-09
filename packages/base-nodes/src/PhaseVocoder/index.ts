import { PluginComponent, WNNode as node } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "phaseVocoder",
  node,
  audioNode,
};

export default plugin;
