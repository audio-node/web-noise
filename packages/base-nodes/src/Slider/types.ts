import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface SliderValues {
  value?: number;
}

export interface SliderConfig {
  min?: number;
  max?: number;
  step?: number;
  isVertical?: boolean;
  color?: string;
  showScale?: boolean;
  scaleSteps?: number;
}

export type SliderData = WNNodeData<SliderValues, SliderConfig>;

export interface SliderProps extends WNNodeProps<SliderData> {};
