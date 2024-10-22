import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface ChannelSplitterValues {
  value?: number;
}

export interface ChannelSplitterConfig {
  //your config here
}

export type ChannelSplitterData = WNNodeData<ChannelSplitterValues, ChannelSplitterConfig>;

export interface ChannelSplitterProps extends WNNodeProps<ChannelSplitterData> {};
