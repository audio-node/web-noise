---
to: <%= dir %>/<%= componentFolder %>/index.ts
---
import { PluginComponent } from "@web-noise/core";
import base from "./base";
<% if(hasControlPanel){ -%>
import <%= componentName %> from "./<%= componentName %>";
<% } -%>
<% if(hasNode){ -%>
import node from "./Node";
<% } else { -%>
import { WNNode as node } from "@web-noise/core";
<% } -%>
<% if(hasConfig){ -%>
import configNode from "./Config";
<% } -%>

const plugin: PluginComponent = {
  ...base,
  node,
<% if(hasControlPanel){ -%>
  controlPanelNode: <%= componentName %>,
<% } -%>
<% if(hasConfig){ -%>
  configNode,
  defaultConfig: {},
<% } -%>
};

export default plugin;
