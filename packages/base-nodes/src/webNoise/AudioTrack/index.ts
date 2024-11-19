import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioTrack from "./AudioTrack";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: AudioTrack,
  configNode,
  defaultConfig,
  resizable: true,
};

export default plugin;
