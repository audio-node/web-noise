import { PluginComponent } from "@web-noise/core";
import base from "./base";
import VirtualKeyboard from "./VirtualKeyboard";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: VirtualKeyboard,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
