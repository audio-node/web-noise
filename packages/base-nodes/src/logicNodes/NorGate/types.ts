import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum NorGateParameters {
  A = "A",
  B = "B",
}

export interface NorGateValues {}

export interface NorGateConfig {}

export type NorGateData = WNNodeData<NorGateValues, NorGateConfig>;

export interface NorGateProps extends WNNodeProps<NorGateData> {}

export interface NorGate extends WNAudioNode {}
