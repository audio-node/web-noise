import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface ChannelMergerValues {
  value?: number;
}

export interface ChannelMergerConfig {
  //your config here
}

export type ChannelMergerData = WNNodeData<ChannelMergerValues, ChannelMergerConfig>;

export interface ChannelMergerProps extends WNNodeProps<ChannelMergerData> {};
