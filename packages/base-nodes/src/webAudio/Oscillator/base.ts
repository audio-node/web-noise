import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "oscillator",
  node: null,
  audioNode,
};

export default plugin;
