import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum DistortionParameters {
  Type = "type",
}

export interface DistortionValues {}

export interface DistortionConfig {}

export type DistortionData = WNNodeData<DistortionValues, DistortionConfig>;

export interface DistortionProps extends WNNodeProps<DistortionData> {}

export interface Distortion extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}
