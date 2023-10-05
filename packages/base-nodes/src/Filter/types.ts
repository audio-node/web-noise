import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface FilterValues {
  type?: BiquadFilterType;
}

export interface FilterConfig {}

export type FilterData = WNNodeData<FilterValues, FilterConfig>;

export interface FilterProps extends WNNodeProps<FilterData> {}
