import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface SpectroscopeValues {
}

export interface SpectroscopeConfig {
  backgroundColor?: string;
  inputColor?: string;
  size?: { width: number; height: number };
}

export type SpectroscopeData = WNNodeData<SpectroscopeValues, SpectroscopeConfig>;

export interface SpectroscopeProps extends WNNodeProps<SpectroscopeData> {};
