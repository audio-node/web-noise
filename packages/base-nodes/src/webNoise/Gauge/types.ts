import type { WNNodeProps, WNNodeData } from "@web-noise/core";

export enum WorkerEventNames {
  INIT = "INIT",
  SET_CONFIG = "SET_CONFIG",
}

export interface InitEvent {
  name: WorkerEventNames.INIT;
  canvas: OffscreenCanvas;
  port: MessagePort;
}

export interface SetConfigEvent {
  name: WorkerEventNames.SET_CONFIG;
  config: GaugeConfig;
  size?: { width: number; height: number };
}

export type GaugeEventData = Float32Array;

export interface GaugeColors {
  arc?: string;
  arrow?: string;
  ticks?: string;
  labels?: string;
}

export interface GaugeValues {}

export interface GaugeConfig {
  backgroundColor?: string;
  arcColor?: string;
  arrowColor?: string;
  ticksColor?: string;
  labelsColor?: string;
  min?: number;
  max?: number;
  majorTicks?: number;
  minorTicks?: number;
  labelsInterval?: number;
  labels?: Array<{
    value?: number;
    label?: string;
    color?: string;
  }>;
}

export type GaugeData = WNNodeData<GaugeValues, GaugeConfig>;

export interface GaugeProps extends WNNodeProps<GaugeData> {}
