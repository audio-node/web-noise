import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum MidiToFrequencyParameters {
  Midi = "A", // Mapped to MathNode's A
  Tune = "B", // Mapped to MathNode's B
}

export interface MidiToFrequencyValues {}

export interface MidiToFrequencyConfig {}

export type MidiToFrequencyData = WNNodeData<
  MidiToFrequencyValues,
  MidiToFrequencyConfig
>;

export interface MidiToFrequencyProps
  extends WNNodeProps<MidiToFrequencyData> {}

export interface MidiToFrequency extends WNAudioNode {}
