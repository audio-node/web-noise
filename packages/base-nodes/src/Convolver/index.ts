import { PluginComponent } from "@web-noise/core";
import Convolver from "./Convolver";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";

const plugin: PluginComponent = {
  type: "convolver",
  controlPanelNode: Convolver,
  node,
  audioNode,
  configNode,
  resizable: true,
  defaultConfig: {
    size: { width: 150, height: 40 },
  },
};

export default plugin;
