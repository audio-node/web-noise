import { PluginComponent } from "@web-noise/core";
import Sticker from "./Sticker";
import node from "./Node";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  type: "sticker",
  controlPanelNode: Sticker,
  node,
  audioNode: false,
  defaultConfig,
};

export default plugin;
