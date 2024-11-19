import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const Gate: PluginComponent = {
  type: "gate",
  audioNode,
  node: null,
};

export default Gate;
