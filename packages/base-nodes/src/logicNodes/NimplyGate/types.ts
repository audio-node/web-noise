import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum NimplyGateParameters {
  A = "A",
  B = "B",
}

export interface NimplyGateValues {}

export interface NimplyGateConfig {}

export type NimplyGateData = WNNodeData<NimplyGateValues, NimplyGateConfig>;

export interface NimplyGateProps extends WNNodeProps<NimplyGateData> {}

export interface NimplyGate extends WNAudioNode {}
