import { PluginComponent } from "@web-noise/core";
import Distortion from "./Distortion";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "distortion",
  controlPanelNode: Distortion,
  node,
  audioNode,
  resizable: true,
  defaultConfig: {
    size: { width: 100, height: 100 },
  },
};

export default plugin;
