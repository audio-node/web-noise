import { PluginComponent, theme } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "waveShaper",
  node: null,
  audioNode,
};

export default plugin;
