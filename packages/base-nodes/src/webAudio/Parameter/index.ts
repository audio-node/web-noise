import { PluginComponent } from "@web-noise/core";
import Parameter from "./Parameter";
import ParameterNode from "./ParameterNode";
import base from "./base";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Parameter,
  node: ParameterNode,
  configNode,
};

export default plugin;
