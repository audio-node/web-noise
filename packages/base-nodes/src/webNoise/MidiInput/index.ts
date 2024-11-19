import { PluginComponent } from "@web-noise/core";
import base from "./base";
import MidiInput from "./MidiInput";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: MidiInput,
};

export default plugin;
