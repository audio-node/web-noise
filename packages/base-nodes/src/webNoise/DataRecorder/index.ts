import { PluginComponent } from "@web-noise/core";
import base from "./base";
import DataRecorder from "./DataRecorder";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: DataRecorder,
};

export default plugin;
