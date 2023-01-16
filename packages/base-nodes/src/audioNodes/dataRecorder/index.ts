import { WNAudioNode } from "@web-noise/core";
import type { PortEvent, ProgressEvent, StartEvent, StopEvent } from "./types";

const worklet = new URL("./worklet.ts", import.meta.url);

export interface DataRecorderValues {
  bpm?: number;
  duration?: number;
}

type ProgressHandler = (event: ProgressEvent) => void;
type StartHandler = (event: StartEvent) => void;
type StopHandler = (event: StopEvent) => void;

export interface DataRecorder extends WNAudioNode {
  dataRecorder: AudioWorkletNode;
  onStart: (fn: StartHandler) => void;
  onStop: (fn: StopHandler) => void;
  onProgress: (fn: ProgressHandler) => void;
  start: () => void;
  stop: () => void;
}

export const dataRecorder = async (
  audioContext: AudioContext
): Promise<DataRecorder> => {
  await audioContext.audioWorklet.addModule(worklet);
  const dataRecorder = new AudioWorkletNode(
    audioContext,
    "data-recorder-processor",
    {
      numberOfInputs: 2,
    }
  );

  const gate = dataRecorder.parameters.get("gate")!;

  let progressHandler: ProgressHandler = () => {};
  let startHandler: StartHandler = () => {};
  let stopHandler: StopHandler = () => {};

  dataRecorder.port.addEventListener(
    "message",
    ({ data }: MessageEvent<PortEvent>) => {
      switch (data.name) {
        case "start":
          startHandler(data);
          break;
        case "stop":
          stopHandler(data);
          break;
        case "progress":
          progressHandler(data);
          break;
      }
    }
  );

  dataRecorder.port.start();

  return {
    inputs: {
      gate: {
        port: gate,
      },
      "0": {
        port: [dataRecorder, 0],
      },
      "1": {
        port: [dataRecorder, 1],
      },
    },
    destroy: () => {
      dataRecorder.port.close();
    },
    onProgress: (fn) => (progressHandler = fn),
    onStart: (fn) => (startHandler = fn),
    onStop: (fn) => (stopHandler = fn),
    start: () => gate.setValueAtTime(1, audioContext.currentTime),
    stop: () => gate.setValueAtTime(0, audioContext.currentTime),
    dataRecorder: dataRecorder,
  };
};
