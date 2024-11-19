import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface DataRecorderValues {}

export interface DataRecorderConfig {}

export type DataRecorderData = WNNodeData<
  DataRecorderValues,
  DataRecorderConfig
>;

export interface DataRecorderProps extends WNNodeProps<DataRecorderData> {}

export interface RecorderData {
  length: number;
  sampleRate: number;
  start: number;
  startTimestamp: number;
  startFrame: number;
  end: number;
  endTimestamp: number;
  endFrame: number;
  channels: [Float32Array, Float32Array];
}

export interface ProgressEvent {
  name: "progress";
  data: number;
}

export interface StartEvent {
  name: "start";
}

export interface StopEvent {
  name: "stop";
  data: RecorderData;
}

export type PortEvent = ProgressEvent | StartEvent | StopEvent;

export interface DataRecorder extends WNAudioNode {
  registerPort: (port: MessagePort) => MessagePort;
}
