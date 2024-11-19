import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface GainValues {}

export interface GainConfig {}

export type GainData = WNNodeData<GainValues, GainConfig>;

export interface GainProps extends WNNodeProps<GainData> {}
