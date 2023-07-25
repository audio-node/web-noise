import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "scale",
  node,
  audioNode,
};

export default plugin;
