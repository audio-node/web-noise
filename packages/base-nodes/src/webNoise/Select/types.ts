import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface SelectValues {
  value?: string;
}

export interface SelectConfig {
  options?: Array<{ key: string; value?: number }>;
  placeholder?: string;
}

export type SelectData = WNNodeData<SelectValues, SelectConfig>;

export interface SelectProps extends WNNodeProps<SelectData> {}
