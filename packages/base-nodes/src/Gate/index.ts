import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./Gate";
import node from "./GateNode";
import audioNode from "./audioNode";

export const Gate: PluginComponent = {
  type: "gate",
  node,
  audioNode,
  controlPanelNode,
};
