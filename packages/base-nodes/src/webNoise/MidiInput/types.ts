import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface MidiInputValues {
  currentInput?: string | null;
}

export interface MidiInputConfig {
  //your config here
}

export type MidiInputData = WNNodeData<MidiInputValues, MidiInputConfig>;

export interface MidiInputProps extends WNNodeProps<MidiInputData> {}

// @ts-ignore
export type MidiInputList = Array<WebMidi.MIDIInput>;

export type MessageData = { name: "inputs-list"; data: MidiInputList };

export type MessageEventHandler = (data: MessageData) => void;
export type MessageEventListener = (
  eventName: "message",
  callback: MessageEventHandler,
) => () => void;

export interface MidiInput extends WNAudioNode {
  midiInputs: MidiInputList;
  setValues: (values?: MidiInputValues) => void;
  addEventListener: MessageEventListener;
}
