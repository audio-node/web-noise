import type { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import audioNode from "../PassThrough/audioNode";

const plugin: PluginComponent = {
  type: "outlet",
  node,
  audioNode,
};

export default plugin;
