import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const Script: PluginComponent = {
  type: "script",
  audioNode,
  node: null,
};

export default Script;
