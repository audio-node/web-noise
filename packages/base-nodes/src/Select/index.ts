import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./Select";
import node from "./SelectNode";
import audioNode from "./audioNode";

export const Select: PluginComponent = {
  type: "select",
  node,
  audioNode,
  controlPanelNode,
};
