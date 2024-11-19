import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Sequencer from "./Sequencer";
import node from "./Node";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: Sequencer,
  configNode,
  defaultConfig: {
    color: "#007bff",
    size: { height: 80, width: 100 },
  },
  resizable: true,
};

export default plugin;
