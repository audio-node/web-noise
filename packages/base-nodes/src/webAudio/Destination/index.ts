import { PluginComponent } from "@web-noise/core";
import Destination from "./Destination";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Destination,
  node,
};

export default plugin;
