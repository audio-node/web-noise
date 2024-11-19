import { type PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "whiteNoise",
  node: null,
  audioNode,
};

export default plugin;
