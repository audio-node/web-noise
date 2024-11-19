import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum SequencerWorkletParameters {
  gate = "gate",
  reset = "reset",
}

export type Sequence = [number, number][];

export interface SequencerValues {
  sequence?: Sequence;
}

export interface SequencerConfig {
  color?: string;
}

export type SequencerData = WNNodeData<SequencerValues, SequencerConfig>;

export interface SequencerProps extends WNNodeProps<SequencerData> {}

export interface Sequencer extends WNAudioNode {
  setValues: (values?: SequencerValues) => void;

  registerPort: (port: MessagePort) => MessagePort;
}

export interface StepStartEvent {
  name: "STEP_START";
  data: number;
}

export interface StepEndEvent {
  name: "STEP_END";
  data: number;
}

export interface SetSequenceEvent {
  name: "SET_SEQUENCE";
  data: Sequence;
}

export type PortEvent = StepStartEvent | StepEndEvent | SetSequenceEvent;
