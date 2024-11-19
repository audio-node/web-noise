import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Sticker from "./Sticker";
import node from "./Node";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Sticker,
  node,
  defaultConfig,
};

export default plugin;