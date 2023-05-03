import { PluginComponent } from "@web-noise/core";
import ScriptNode from "./ScriptNode";
import { scriptNode } from "./script";
import { scriptNode as workletScriptNode } from "./workletScript";

export const Script: PluginComponent = {
  type: "script",
  node: ScriptNode,
  audioNode: scriptNode,
};

export const WorkletScript: PluginComponent = {
  type: "workletScript",
  node: ScriptNode,
  audioNode: workletScriptNode,
};
