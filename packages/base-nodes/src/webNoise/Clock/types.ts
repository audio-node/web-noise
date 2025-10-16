import type { WNNodeProps, WNNodeData } from "@web-noise/core";

export enum ClockParameters {
  BPM = "bpm",
  Duty = "duty",
}

export interface ClockValues {
  value?: number;
}

export interface ClockConfig {
  //your config here
}

export type ClockData = WNNodeData<ClockValues, ClockConfig>;

export interface ClockProps extends WNNodeProps<ClockData> {}
