import { PluginComponent } from "@web-noise/core";
import { constantSource } from "./constantSource";

const plugin: PluginComponent = {
  type: "parameter",
  node: null,
  audioNode: constantSource,
};

export default plugin;
