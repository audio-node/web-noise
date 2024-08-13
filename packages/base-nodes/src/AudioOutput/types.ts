import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export type OutputsChangeHandler = (inputs: Array<MediaDeviceInfo>) => void;

export interface AudioOutputValues {
  currentOutput?: MediaDeviceInfo["deviceId"] | null;
}

export interface AudioOutput extends WNAudioNode {
  audioOutputs: AudioOutputList;
  onInputsChange: (fn: OutputsChangeHandler) => void;
  setValues: (values?: AudioOutputValues) => void;
}
export interface AudioInputValues {
  currentInput?: MediaDeviceInfo["deviceId"] | null;
}

export type AudioOutputList = Array<MediaDeviceInfo>;

export interface AudioOutputConfig {
}

export type AudioOutputData = WNNodeData<AudioOutputValues, AudioOutputConfig>;

export interface AudioOutputProps extends WNNodeProps<AudioOutputData> {};
