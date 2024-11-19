import { PluginComponent } from "@web-noise/core";
import base from "./base";
import ScriptNode from "../ScriptNode";

const WorkletScript: PluginComponent = {
  ...base,
  node: ScriptNode,
};

export default WorkletScript;
