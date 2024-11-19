import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "spectroscope",
  audioNode,
  node: null,
};

export default plugin;
