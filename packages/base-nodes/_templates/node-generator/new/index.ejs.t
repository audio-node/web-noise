---
to: src/<%= name %>/index.ts
---
import { PluginComponent } from "@web-noise/core";
import <%= componentName %> from "./<%= componentName %>";
import node from "./Node";
import audioNode from "./audioNode";
import configNode from "./Config";

const plugin: PluginComponent = {
  type: "<%= componentType %>",
  controlPanelNode: <%= componentName %>,
  node,
  audioNode,
  configNode,
  defaultConfig: {},
};

export default plugin;
