import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface ChannelMergerValues {}

export interface ChannelMergerConfig {}

export type ChannelMergerData = WNNodeData<
  ChannelMergerValues,
  ChannelMergerConfig
>;

export interface ChannelMergerProps extends WNNodeProps<ChannelMergerData> {}
