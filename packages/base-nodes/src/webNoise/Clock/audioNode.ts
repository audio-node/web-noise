import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import clockWorkletUrl from "worklet:./worklet.ts";

const clockWorklet = new URL(clockWorkletUrl, import.meta.url);

export interface Clock extends WNAudioNode {}

const clock = async (audioContext: AudioContext): Promise<Clock> => {
  await audioContext.audioWorklet.addModule(clockWorklet);
  const clock = new AudioWorkletNode(audioContext, "clock-processor");

  const bpm = clock.parameters.get("bpm")!;
  const duty = clock.parameters.get("duty")!;

  return {
    inputs: {
      bpm: {
        port: bpm,
      },
      duty: {
        port: duty,
      },
    },
    outputs: {
      trigger: {
        port: [clock, 0],
      },
    },
  };
};

export default clock;
