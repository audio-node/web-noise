import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";
import { AudioTrack } from "../AudioTrack/types";

export enum RecorderParameters {
  Record = "record",
  Erase = "erase",
}

export interface RecorderValues {
  src?: string;
}

export interface RecorderConfig {
  waveColor?: string;
  progressColor?: string;
  rangeColor?: string;
}

export type RecorderData = WNNodeData<RecorderValues, RecorderConfig>;

export interface RecorderProps extends WNNodeProps<RecorderData> {}

export interface Recorder extends AudioTrack {
  registerRecorderPort: (port: MessagePort) => MessagePort;
}
