import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";
import type EventBus from "../../lib/EventBus";

export type ListEventHandler = (inputs: Array<MediaDeviceInfo>) => void;

export type ListEventListener = (eventName: "list", callback: ListEventHandler) => () => void

export interface AudioOutputValues {
  currentOutput?: MediaDeviceInfo["deviceId"] | null;
}

export interface AudioOutput extends WNAudioNode {
  audioOutputs: AudioOutputList;
  setValues: (values?: AudioOutputValues) => void;
  addEventListener: ListEventListener
}
export interface AudioInputValues {
  currentInput?: MediaDeviceInfo["deviceId"] | null;
}

export type AudioOutputList = Array<MediaDeviceInfo>;

export interface AudioOutputConfig {}

export type AudioOutputData = WNNodeData<AudioOutputValues, AudioOutputConfig>;

export interface AudioOutputProps extends WNNodeProps<AudioOutputData> {}
