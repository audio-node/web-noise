import { PluginComponent, WNNode } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node: WNNode,
};

export default plugin;