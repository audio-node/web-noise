import type { PluginComponent } from "@web-noise/core";
import Patch from "./Patch";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node: Patch,
};

export default plugin;
