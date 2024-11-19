import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface VirtualKeyboardValues {
  value?: number;
}

export interface VirtualKeyboardConfig {
  firstNote?: number;
  keyboardSize?: number;
}

export type VirtualKeyboardData = WNNodeData<
  VirtualKeyboardValues,
  VirtualKeyboardConfig
>;

export interface VirtualKeyboardProps
  extends WNNodeProps<VirtualKeyboardData> {}

export interface VirtualKeyboard extends WNAudioNode {
  gate: ConstantSourceNode;
  frequency: ConstantSourceNode;
  midi: ConstantSourceNode;
  play: (note: number) => void;
  stop: (note: number) => void;
}
