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
  time: string;
}

export interface StartEvent {
  name: "start";
}

export interface StopEvent {
  name: "stop";
  data: RecorderData;
}

export type PortEvent = ProgressEvent | StartEvent | StopEvent;
