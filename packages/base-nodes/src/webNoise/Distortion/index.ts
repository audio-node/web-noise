import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Distortion from "./Distortion";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Distortion,
  node,
  resizable: true,
  defaultConfig: {
    size: { width: 100, height: 100 },
  },
};

export default plugin;
