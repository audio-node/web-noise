import type { WNNodeProps, WNNodeData } from "@web-noise/core";

export enum OscilloscopeParameters {
  FFTSize = "fftSize",
}

export type AnalyserEventHandler = (event: { data: Float32Array }) => void;

export interface OscilloscopeValues {}

export interface OscilloscopeConfig {
  minValue?: number;
  maxValue?: number;
  backgroundColor?: string;
  input1Color?: string;
  input2Color?: string;
  showGrid?: boolean;
  gridColor?: string;
  gridRows?: number;
  gridColumns?: number;
}

export type OscilloscopeData = WNNodeData<
  OscilloscopeValues,
  OscilloscopeConfig
>;

export interface OscilloscopeProps extends WNNodeProps<OscilloscopeData> {}
