import type { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface WhiteNoiseValues {}

export interface WhiteNoiseConfig {}

export type WhiteNoiseData = WNNodeData<WhiteNoiseValues, WhiteNoiseConfig>;

export interface WhiteNoiseProps extends WNNodeProps<WhiteNoiseData> {}
