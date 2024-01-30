import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface Point {
  x: number;
  y: number;
}
export type Points = Array<{ x: number; y: number }>;

export type SplineType = "monotonic" | "natural";

export interface WaveShaperValues {
  points?: Points;
  splineType?: SplineType;
  oversample?: OverSampleType;
}

export interface WaveShaperConfig {
  textColor?: string;
  curveColor?: string;
  gridColor?: string;
  controlPointColor?: string;
}

export type WaveShaperData = WNNodeData<WaveShaperValues, WaveShaperConfig>;

export interface WaveShaperProps extends WNNodeProps<WaveShaperData> {}
