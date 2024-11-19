import type { PluginComponent } from "@web-noise/core";
import audioNode from "../../webNoise/PassThrough/audioNode";

const plugin: PluginComponent = {
  type: "outlet",
  node: null,
  audioNode,
};

export default plugin;
