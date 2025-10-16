import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum AudioTrackParameters {
  Gate = "gate",
  Restart = "restart",
  Loop = "loop",
  Start = "start",
  End = "end",
  Detune = "detune",
  PlaybackRate = "playbackRate",
}

export interface AudioTrackValues {
  src?: string;
}

export interface AudioTrackConfig {
  waveColor?: string;
  progressColor?: string;
  rangeColor?: string;
  size?: { width: number; height: number };
}

export type AudioTrackData = WNNodeData<AudioTrackValues, AudioTrackConfig>;

export interface AudioTrackProps extends WNNodeProps<AudioTrackData> {}

export interface AudioTrack extends WNAudioNode {}

export interface TrackData {
  duration: AudioBuffer["duration"];
  length: AudioBuffer["length"];
  sampleRate: AudioBuffer["sampleRate"];
  channelData: [Float32Array, Float32Array];
}

export type StatusData =
  | { name: "error"; error: Error }
  | { name: "loading" }
  | { name: "loaded" };

export type StatusEventHandler = (data: StatusData) => void;
export type StatusEventListener = (
  eventName: "status",
  callback: StatusEventHandler,
) => () => void;

export interface AudioTrack extends WNAudioNode {
  setValues: (values?: AudioTrackValues) => void;
  loadBuffer: (url: string) => void;
  registerPort: (port: MessagePort) => MessagePort;
  addEventListener: StatusEventListener;
  audioTrackWorklet: AudioWorkletNode;
}

export interface TimeEvent {
  name: "time";
  cursor: number;
  seconds: number;
  progress: number;
}

export interface TrackEvent {
  name: "track";
  data: TrackData;
}

export interface ChunkEvent {
  name: "data-chunk";
  data: [Float32Array, Float32Array];
}

export interface RangeEvent {
  name: "range";
  data: [number, number];
}

export type MessageData =
  | { name: "buffer"; buffer: AudioBuffer; duration: number }
  | TrackEvent
  | TimeEvent
  | RangeEvent
  | ChunkEvent;
