import { PluginComponent } from "@web-noise/core";
import base from "./base";
import ScriptNode from "../ScriptNode";

const Script: PluginComponent = {
  ...base,
  node: ScriptNode,
};

export default Script;
