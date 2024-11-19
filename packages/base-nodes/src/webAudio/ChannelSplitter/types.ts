import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface ChannelSplitterValues {}

export interface ChannelSplitterConfig {}

export type ChannelSplitterData = WNNodeData<
  ChannelSplitterValues,
  ChannelSplitterConfig
>;

export interface ChannelSplitterProps
  extends WNNodeProps<ChannelSplitterData> {}
