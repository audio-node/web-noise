import { PluginComponent } from "@web-noise/core";
import Destination from "./Destination";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "destination",
  controlPanelNode: Destination,
  node,
  audioNode,
};

export default plugin;
