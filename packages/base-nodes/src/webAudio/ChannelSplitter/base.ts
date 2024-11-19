import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "channelSplitter",
  node: null,
  audioNode,
};

export default plugin;
