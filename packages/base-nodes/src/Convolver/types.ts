import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface ConvolverValues {
  url?: string;
}

export interface ConvolverConfig {
  //your config here
}

export type ConvolverData = WNNodeData<ConvolverValues, ConvolverConfig>;

export interface ConvolverProps extends WNNodeProps<ConvolverData> {};
