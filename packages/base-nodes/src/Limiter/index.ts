import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "limiter",
  node,
  audioNode,
};

export default plugin;
