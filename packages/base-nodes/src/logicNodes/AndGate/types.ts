import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum AndGateParameters {
  A = "A",
  B = "B",
}

export interface AndGateValues {}

export interface AndGateConfig {}

export type AndGateData = WNNodeData<AndGateValues, AndGateConfig>;

export interface AndGateProps extends WNNodeProps<AndGateData> {}

export interface AndGate extends WNAudioNode {}
