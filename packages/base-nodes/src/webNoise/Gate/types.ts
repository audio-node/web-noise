import type { WNNodeData, WNNodeProps } from "@web-noise/core";

export interface GateValues {
  isOpened?: boolean;
}

export interface GateConfig {
  isToggle?: boolean;
  label?: string;
  color?: string;
  textColor?: string;
  labelOpened?: string;
  colorOpened?: string;
  textColorOpened?: string;
}

export type GateData = WNNodeData<GateValues, GateConfig>;

export interface GateProps extends WNNodeProps<GateData> {}
