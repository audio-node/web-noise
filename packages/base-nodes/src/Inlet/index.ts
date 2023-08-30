import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import { passThrough } from "../audioNodes/passThrough";

const plugin: PluginComponent = {
  type: "inlet",
  node,
  audioNode: passThrough,
};

export default plugin;
