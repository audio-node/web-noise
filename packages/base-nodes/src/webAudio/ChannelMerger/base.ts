import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "channelMerger",
  node: null,
  audioNode,
};

export default plugin;
