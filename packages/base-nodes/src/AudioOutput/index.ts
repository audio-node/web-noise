import { PluginComponent } from "@web-noise/core";
import AudioOutput from "./AudioOutput";
import node from "./Node";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "audioOutput",
  controlPanelNode: AudioOutput,
  node,
  audioNode,
};

export default plugin;
