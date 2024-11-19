---
to: <%= dir %>/<%= componentFolder %>/base.ts
---
import { PluginComponent } from "@web-noise/core";
<% if(hasAudioNode){ -%>
import audioNode from "./audioNode";
<% } -%>

const plugin: PluginComponent = {
  type: "<%= componentType %>",
  node: null,
  audioNode: <%= hasAudioNode ? 'audioNode' : 'false' %>,
};

export default plugin;
