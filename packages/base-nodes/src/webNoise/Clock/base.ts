import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "clock",
  node: null,
  audioNode: audioNode,
};

export default plugin;
