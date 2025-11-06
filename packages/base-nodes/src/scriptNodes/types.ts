import type { WNAudioNode, WNNodeData, WNNodeProps } from "@web-noise/core";

export interface ScriptNodeValues {
  expression?: string;
}

export interface ScriptNodeConfig {
  size?: {
    width: number;
    height: number;
  };
}

export type ScriptNodeData = WNNodeData<ScriptNodeValues, ScriptNodeConfig>;

export interface GateProps extends WNNodeProps<ScriptNodeData> {}

export type MessageData =
  | { name: "error"; error: Error }
  | { name: "clean-error" };

export type IncomingMessageData = { name: "expression"; value: string };

export interface ScriptNode extends WNAudioNode {
  channel: MessagePort;
  setValues: (values?: ScriptNodeValues) => void;
}
