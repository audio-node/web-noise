---
to: <%= dir %>/<%= componentFolder %>/types.ts
---
import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface <%= componentName %>Values {
  value?: number;
}

export interface <%= componentName %>Config {
  //your config here
}

export type <%= componentName %>Data = WNNodeData<<%= componentName %>Values, <%= componentName %>Config>;

export interface <%= componentName %>Props extends WNNodeProps<<%= componentName %>Data> {};
