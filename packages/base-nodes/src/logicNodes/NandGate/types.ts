import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum NandGateParameters {
  A = "A",
  B = "B",
}

export interface NandGateValues {}

export interface NandGateConfig {}

export type NandGateData = WNNodeData<NandGateValues, NandGateConfig>;

export interface NandGateProps extends WNNodeProps<NandGateData> {}

export interface NandGate extends WNAudioNode {}
