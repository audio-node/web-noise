import type { WNAudioNode, WNNodeData, WNNodeProps } from "@web-noise/core";

export interface ParameterValues {
  value?: number;
}

export interface ParameterConfig {
  min?: number;
  max?: number;
  step?: number;
}

export type ParameterData = WNNodeData<ParameterValues, ParameterConfig>;

export interface ParameterProps extends WNNodeProps<ParameterData> {}

export interface ParameterAudioNode extends WNAudioNode {
  constantSource: ConstantSourceNode;
  setValues: (values?: ParameterValues) => void;
}
