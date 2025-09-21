import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioRecorder from "./AudioRecorder";
import node from "./Node";
import configNode from "../AudioTrack/Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: AudioRecorder,
  configNode,
  defaultConfig,
};

export default plugin;
