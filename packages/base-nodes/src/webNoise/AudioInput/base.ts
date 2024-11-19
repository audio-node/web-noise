import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "audioInput",
  node: null,
  audioNode: audioNode,
};

export default plugin;
