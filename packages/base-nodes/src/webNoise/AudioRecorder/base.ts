import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const plugin: PluginComponent = {
  type: "audioRecorder",
  node: null,
  audioNode,
};

export default plugin;
