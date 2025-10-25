import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum XnorGateParameters {
  A = "A",
  B = "B",
}

export interface XnorGateValues {}

export interface XnorGateConfig {}

export type XnorGateData = WNNodeData<XnorGateValues, XnorGateConfig>;

export interface XnorGateProps extends WNNodeProps<XnorGateData> {}

export interface XnorGate extends WNAudioNode {}
