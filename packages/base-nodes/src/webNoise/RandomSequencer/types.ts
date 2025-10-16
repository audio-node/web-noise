import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface RandomSequencerValues {}

export interface RandomSequencerConfig {}

export interface NoteChangeEvent {
  name: string;
  note: string;
  midiNumber: number;
}

export interface RandomSequencer extends WNAudioNode {
  registerPort: (port: MessagePort) => MessagePort;
}

export type RandomSequencerData = WNNodeData<
  RandomSequencerValues,
  RandomSequencerConfig
>;

export interface RandomSequencerProps
  extends WNNodeProps<RandomSequencerData> {}
