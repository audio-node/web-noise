import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum NotGateParameters {
  A = "A",
}

export interface NotGateValues {}

export interface NotGateConfig {}

export type NotGateData = WNNodeData<NotGateValues, NotGateConfig>;

export interface NotGateProps extends WNNodeProps<NotGateData> {}

export interface NotGate extends WNAudioNode {}
