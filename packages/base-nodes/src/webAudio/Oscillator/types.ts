import { WNNodeProps, WNNodeData } from "@web-noise/core";

export interface OscillatorValues {
  type?: OscillatorType;
}

export interface OscillatorConfig {}

export type OscillatorData = WNNodeData<OscillatorValues, OscillatorConfig>;

export interface OscillatorProps extends WNNodeProps<OscillatorData> {}
