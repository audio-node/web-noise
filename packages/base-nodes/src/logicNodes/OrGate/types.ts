import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum OrGateParameters {
  A = "A",
  B = "B",
}

export interface OrGateValues {}

export interface OrGateConfig {}

export type OrGateData = WNNodeData<OrGateValues, OrGateConfig>;

export interface OrGateProps extends WNNodeProps<OrGateData> {}

export interface OrGate extends WNAudioNode {}
