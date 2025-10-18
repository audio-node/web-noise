import fetch from "@web-noise/fetch";
import { PortType } from "@web-noise/core/constants";
import EventBus from "../../lib/EventBus";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { AudioTrackData, AudioTrack, AudioTrackParameters } from "./types";

//@ts-ignore
import audioTrackWorkletUrl from "worklet:./worklet.ts";
const audioTrackWorklet = new URL(audioTrackWorkletUrl, import.meta.url);

// @TODO: use loadAudioBuffer from lib
const loadTrack = async (
  url: string,
  audioContext: AudioContext,
): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

export const audioTrack = async (
  audioContext: AudioContext,
): Promise<AudioTrack> => {
  await audioContext.audioWorklet.addModule(audioTrackWorklet);
  const audioTrack = new AudioWorkletNode(
    audioContext,
    "audio-track-processor",
    {
      numberOfOutputs: 4,
    },
  );

  const events = new EventBus();

  const gate = audioTrack.parameters.get(AudioTrackParameters.Gate)!;
  const restart = audioTrack.parameters.get(AudioTrackParameters.Restart)!;
  const loop = audioTrack.parameters.get(AudioTrackParameters.Loop)!;
  const start = audioTrack.parameters.get(AudioTrackParameters.Start)!;
  const end = audioTrack.parameters.get(AudioTrackParameters.End)!;
  const detune = audioTrack.parameters.get(AudioTrackParameters.Detune)!;
  const playbackRate = audioTrack.parameters.get(
    AudioTrackParameters.PlaybackRate,
  )!;

  audioTrack.port.start();

  const loadBuffer = async (url: string) => {
    events.trigger("status", { name: "loading" });
    try {
      const buffer = await loadTrack(url, audioContext);

      const { sampleRate, length, duration } = buffer;
      const event = {
        name: "track",
        data: {
          sampleRate,
          length,
          duration,
          channelData: [buffer.getChannelData(0), buffer.getChannelData(1)],
        },
      };
      audioTrack.port.postMessage(event);
    } catch (e) {
      events.trigger("status", { name: "error", error: e as Error });
    }
    events.trigger("status", { name: "loaded" });
  };

  return {
    audioTrackWorklet: audioTrack,
    inputs: {
      gate: {
        port: gate,
        type: PortType.Gate,
        range: [gate.minValue, gate.maxValue],
        defaultValue: gate.defaultValue,
      },
      restart: {
        port: restart,
        type: PortType.Gate,
        range: [restart.minValue, restart.maxValue],
        defaultValue: restart.defaultValue,
      },
      loop: {
        port: loop,
        type: PortType.Gate,
        range: [loop.minValue, loop.maxValue],
        defaultValue: loop.defaultValue,
      },
      start: {
        port: start,
        type: PortType.Number,
        range: [start.minValue, start.maxValue],
        defaultValue: start.defaultValue,
      },
      end: {
        port: end,
        type: PortType.Number,
        range: [end.minValue, end.maxValue],
        defaultValue: end.defaultValue,
      },
      detune: {
        port: detune,
        type: PortType.Number,
        range: [detune.minValue, detune.maxValue],
        defaultValue: detune.defaultValue,
      },
      playbackRate: {
        port: playbackRate,
        type: PortType.Number,
        range: [playbackRate.minValue, playbackRate.maxValue],
        defaultValue: playbackRate.defaultValue,
      },
    },
    outputs: {
      out: {
        port: [audioTrack, 0],
        type: PortType.Audio,
      },
      gate: {
        port: [audioTrack, 1],
        type: PortType.Gate,
      },
      duration: {
        port: [audioTrack, 2],
        type: PortType.Number,
      },
      time: {
        port: [audioTrack, 3],
        type: PortType.Number,
      },
    },
    setValues: ({ src: srcValue } = {}) => {
      typeof srcValue !== "undefined" &&
        srcValue !== "" &&
        loadBuffer(srcValue);
    },
    destroy: () => {
      audioTrack.port.close();
    },
    loadBuffer,
    addEventListener: (...args) => events.addEventListener(...args),
    registerPort: (port) => {
      addBroadcastListener(audioTrack.port, port);
      return audioTrack.port;
    },
  };
};

export default audioTrack;
