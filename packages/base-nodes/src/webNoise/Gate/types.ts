import type { WNNodeProps } from "@web-noise/core";

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

export interface GateData {
  values?: GateValues;
  config?: GateConfig;
}

export interface GateProps extends WNNodeProps<GateData> {}
