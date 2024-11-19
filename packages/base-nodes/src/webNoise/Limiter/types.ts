import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface LimiterValues {
  value?: number;
}

export interface LimiterConfig {
  //your config here
}

export type LimiterData = WNNodeData<LimiterValues, LimiterConfig>;

export interface LimiterProps extends WNNodeProps<LimiterData> {};
