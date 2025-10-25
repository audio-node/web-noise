---
to: <%= dir %>/<%= componentFolder %>/types.ts
---
<%
  const params = workletParameters 
    ? workletParameters.split(',').map(p => p.trim()).filter(p => p)
    : [];
%>
import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";
<% if (params.length > 0) { -%>

export enum <%= componentName %>Parameters {
<% params.forEach((param, index) => { -%>
  <%= param %> = "<%= param %>",
<% }); -%>
}
<% } -%>

export interface <%= componentName %>Values {
  value?: number;
}

export interface <%= componentName %>Config {
  //your config here
}

export type <%= componentName %>Data = WNNodeData<<%= componentName %>Values, <%= componentName %>Config>;

export interface <%= componentName %>Props extends WNNodeProps<<%= componentName %>Data> {};

export interface <%= componentName %> extends WNAudioNode {
  setValues: (values?: <%= componentName %>Values) => void;
}
