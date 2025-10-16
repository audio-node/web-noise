import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface AudioInputValues {
  currentInput?: MediaDeviceInfo["deviceId"] | null;
}

export interface AudioInputConfig {}

export type AudioInputData = WNNodeData<AudioInputValues, AudioInputConfig>;

export interface AudioInputProps extends WNNodeProps<AudioInputData> {}

export type AudioInputList = Array<MediaDeviceInfo>;

export type MessageData = { name: "inputs-list"; data: AudioInputList };

export type MessageEventHandler = (data: MessageData) => void;
export type MessageEventListener = (
  eventName: "message",
  callback: MessageEventHandler,
) => () => void;

export interface AudioInput extends WNAudioNode {
  audioInputs: AudioInputList;
  setValues: (values?: AudioInputValues) => void;
  addEventListener: MessageEventListener;
}
