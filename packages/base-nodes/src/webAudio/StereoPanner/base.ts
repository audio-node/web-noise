import { PluginComponent, WNNode as node } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "stereoPanner",
  node: null,
  audioNode,
};

export default plugin;
