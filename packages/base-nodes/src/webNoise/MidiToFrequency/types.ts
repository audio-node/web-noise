import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface MidiToFrequencyValues {}

export interface MidiToFrequencyConfig {}

export type MidiToFrequencyData = WNNodeData<
  MidiToFrequencyValues,
  MidiToFrequencyConfig
>;

export interface MidiToFrequencyProps
  extends WNNodeProps<MidiToFrequencyData> {}

export interface MidiToFrequency extends WNAudioNode {}
