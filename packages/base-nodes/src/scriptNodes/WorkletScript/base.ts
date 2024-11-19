import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const WorkletScript: PluginComponent = {
  type: "workletScript",
  audioNode,
  node: null,
};

export default WorkletScript;
