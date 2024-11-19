import { type PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "oscilloscope",
  audioNode,
  node: null,
};

export default plugin;
