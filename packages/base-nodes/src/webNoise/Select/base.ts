import { PluginComponent } from "@web-noise/core";
import audioNode from "./audioNode";

const Select: PluginComponent = {
  type: "select",
  audioNode,
  node: null,
};

export default Select;
