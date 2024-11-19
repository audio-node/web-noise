import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface Destination extends WNAudioNode {}

export interface DestinationValues {}

export interface DestinationConfig {}

export type DestinationData = WNNodeData<DestinationValues, DestinationConfig>;

export interface DestinationProps extends WNNodeProps<DestinationData> {}
