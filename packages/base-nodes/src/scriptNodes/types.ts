import { WNAudioNode } from "@web-noise/core";

export interface ScriptNodeValues {
  expression?: string;
}

export interface ScriptNodeConfig {
  size?: {
    width: number;
    height: number;
  };
}

export interface ScriptNodeData {
  label: string;
  values?: ScriptNodeValues;
  config?: ScriptNodeConfig;
}

export type MessageData =
  | { name: "error"; error: Error }
  | { name: "clean-error" };

export type IncomingMessageData = { name: "expression"; value: string };

export interface ScriptNode extends WNAudioNode {
  channel: MessagePort;
  setValues: (values?: ScriptNodeValues) => void;
}
