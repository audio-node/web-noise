import { PluginComponent } from "@web-noise/core";
import Convolver from "./Convolver";
import node from "./Node";
import base from "./base";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Convolver,
  node,
  configNode,
  resizable: true,
  defaultConfig: {
    size: { width: 150, height: 40 },
  },
};

export default plugin;
