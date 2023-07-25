---
to: src/<%= componentFolder %>/index.ts
---
import { PluginComponent } from "@web-noise/core";
<% if(hasControlPanel){ -%>
import <%= componentName %> from "./<%= componentName %>";
<% } -%>
<% if(hasNode){ -%>
import node from "./Node";
<% } else { -%>
import { WNNode as node } from "@web-noise/core";
<% } -%>
<% if(hasAudioNode){ -%>
import audioNode from "./audioNode";
<% } -%>
<% if(hasConfig){ -%>
import configNode from "./Config";
<% } -%>

const plugin: PluginComponent = {
  type: "<%= componentType %>",
<% if(hasControlPanel){ -%>
  controlPanelNode: <%= componentName %>,
<% } -%>
  node,
  audioNode<%= hasAudioNode ? null : ': false' %>,
<% if(hasConfig){ -%>
  configNode,
  defaultConfig: {},
<% } -%>
};

export default plugin;
