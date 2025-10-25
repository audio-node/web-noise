import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum XorGateParameters {
  A = "A",
  B = "B",
}

export interface XorGateValues {}

export interface XorGateConfig {}

export type XorGateData = WNNodeData<XorGateValues, XorGateConfig>;

export interface XorGateProps extends WNNodeProps<XorGateData> {}

export interface XorGate extends WNAudioNode {}
