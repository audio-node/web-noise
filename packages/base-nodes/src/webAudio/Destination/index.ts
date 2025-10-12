import { PluginComponent } from "@web-noise/core";
import Destination from "./Destination";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Destination,
  node,
  name: "Destination (Speaker)",
  description:
    "The final audio processing or rendering destination (usually the speakers)",
};

export default plugin;
