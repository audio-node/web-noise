import { WNAudioNode } from "@web-noise/core";

export interface ScriptNodeValues {
  expression?: string;
}

export type MessageData =
  | { name: "error"; error: Error }
  | { name: "clean-error" };

export type IncomingMessageData = { name: "expression"; value: string };

export interface ScriptNode extends WNAudioNode {
  channel: MessagePort;
  setValues: (values?: ScriptNodeValues) => void;
}
