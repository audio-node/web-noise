import { PluginComponent } from "@web-noise/core";
import base from "./base";
import { WNNode as node } from "@web-noise/core";

const plugin: PluginComponent = {
  ...base,
  node,
};

export default plugin;
