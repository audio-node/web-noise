import type { PluginComponent } from "@web-noise/core";
import audioNode from "../../webNoise/PassThrough/audioNode";

const plugin: PluginComponent = {
  type: "inlet",
  node: null,
  audioNode,
};

export default plugin;
