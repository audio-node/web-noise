import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum ImplyGateParameters {
  A = "A",
  B = "B",
}

export interface ImplyGateValues {}

export interface ImplyGateConfig {}

export type ImplyGateData = WNNodeData<ImplyGateValues, ImplyGateConfig>;

export interface ImplyGateProps extends WNNodeProps<ImplyGateData> {}

export interface ImplyGate extends WNAudioNode {}
