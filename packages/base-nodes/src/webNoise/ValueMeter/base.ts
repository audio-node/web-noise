import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "valueMeter",
  node: null,
  audioNode,
};

export default plugin;
