import { PluginComponent } from "@web-noise/core";
import Parameter from "./Parameter";
import ParameterNode from "./ParameterNode";
import { constantSource } from "./constantSource";
import configNode from "./Config";

const plugin: PluginComponent = {
  type: "parameter",
  controlPanelNode: Parameter,
  node: ParameterNode,
  audioNode: constantSource,
  // @ts-ignore
  configNode,
};

export default plugin;
