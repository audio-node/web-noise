import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioOutput from "./AudioOutput";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: AudioOutput,
  node,
};

export default plugin;