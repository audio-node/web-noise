import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "limiter",
  audioNode,
  node: null,
};

export default plugin;
