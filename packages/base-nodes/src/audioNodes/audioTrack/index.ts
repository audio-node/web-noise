import { WNAudioNode } from "@web-noise/core";

const audioTrackWorkletUrl = new URL("./worklet.ts", import.meta.url);

export interface AudioTrackValues {
  src?: string;
  start?: number;
  end?: number;
}

interface TrackData {
  duration: AudioBuffer["duration"];
  length: AudioBuffer["length"];
  sampleRate: AudioBuffer["sampleRate"];
  channelData: [Float32Array, Float32Array];
}

export interface AudioTrack extends WNAudioNode {
  setValues: (values?: AudioTrackValues) => void;
  loadBuffer: (url: string) => void;
  play: () => void;
  stop: () => void;
  onMessage: (fn: MessageHandler) => void;
  audioTrackWorklet: AudioWorkletNode;
}

type MessageData =
  | { name: "error"; error: Error }
  | { name: "loading" }
  | { name: "loaded" }
  | { name: "buffer"; buffer: AudioBuffer; duration: number }
  | { name: "track"; data: TrackData }
  | { name: "time"; cursor: number; seconds: number; progress: number };

type MessageHandler = (args: MessageData) => void;

const loadTrack = async (
  url: string,
  audioContext: AudioContext
): Promise<AudioBuffer> => {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return audioContext.decodeAudioData(arrayBuffer);
};

export const audioTrack = async (
  audioContext: AudioContext
): Promise<AudioTrack> => {
  await audioContext.audioWorklet.addModule(audioTrackWorkletUrl);
  const audioTrack = new AudioWorkletNode(
    audioContext,
    "audio-track-processor",
    {
      numberOfOutputs: 2,
    }
  );

  const gate = audioTrack.parameters.get("gate")!;
  const restart = audioTrack.parameters.get("restart")!;
  const loop = audioTrack.parameters.get("loop")!;
  const start = audioTrack.parameters.get("start")!;
  const end = audioTrack.parameters.get("end")!;

  let messageHandler: MessageHandler = () => {};
  audioTrack.port.start();

  const loadBuffer = async (url: string) => {
    messageHandler({ name: "loading" });
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
      //@ts-ignore
      messageHandler(event);
    } catch (e) {
      messageHandler({ name: "error", error: e as Error });
    }
    messageHandler({ name: "loaded" });
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
    },
    outputs: {
      out: {
        port: [audioTrack, 0],
      },
      gate: {
        port: [audioTrack, 1],
      },
    },
    setValues: ({ src: srcValue, start: startValue, end: endValue } = {}) => {
      typeof srcValue !== "undefined" &&
        srcValue !== "" &&
        loadBuffer(srcValue);
      typeof startValue !== "undefined" &&
        start.setValueAtTime(startValue, audioContext.currentTime);
      typeof endValue !== "undefined" &&
        end.setValueAtTime(endValue, audioContext.currentTime);
    },
    destroy: () => {
      audioTrack.port.close();
    },
    loadBuffer,
    play: () => {
      gate.setValueAtTime(1, audioContext.currentTime);
    },
    stop: () => {
      gate.setValueAtTime(0, audioContext.currentTime);
    },
    onMessage: (fn) => (messageHandler = fn),
  };
};

export default audioTrack;
