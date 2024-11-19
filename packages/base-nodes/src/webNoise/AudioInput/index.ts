import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioInput from "./AudioInput";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: AudioInput,
};

export default plugin;
