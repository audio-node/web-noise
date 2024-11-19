import { WNAudioNode } from "@web-noise/core";
import EventBus from "../../lib/EventBus";
import { addBroadcastListener, useBroadcast } from "../../lib/useBroadcast";
import { AudioTrackValues, AudioTrackData, AudioTrack } from "./types";

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

  const gate = audioTrack.parameters.get("gate")!;
  const restart = audioTrack.parameters.get("restart")!;
  const loop = audioTrack.parameters.get("loop")!;
  const start = audioTrack.parameters.get("start")!;
  const end = audioTrack.parameters.get("end")!;
  const detune = audioTrack.parameters.get("detune")!;
  const playbackRate = audioTrack.parameters.get("playbackRate")!;

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
      },
      restart: {
        port: restart,
      },
      loop: {
        port: loop,
      },
      start: {
        port: start,
      },
      end: {
        port: end,
      },
      detune: {
        port: detune,
      },
      playbackRate: {
        port: playbackRate,
      },
    },
    outputs: {
      out: {
        port: [audioTrack, 0],
      },
      gate: {
        port: [audioTrack, 1],
      },
      duration: {
        port: [audioTrack, 2],
      },
      time: {
        port: [audioTrack, 3],
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
