import { PluginComponent } from "@web-noise/core";
import Oscillator from "./Oscillator";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Oscillator,
  node,
};

export default plugin;
