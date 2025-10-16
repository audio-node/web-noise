import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { LimiterData } from "./types";

//@ts-ignore
import limiterWorkletUrl from "worklet:./worklet/index.ts";
const limiterWorklet = new URL(limiterWorkletUrl, import.meta.url);

export interface Limiter extends WNAudioNode {}

export const limiter = async (
  audioContext: AudioContext,
  data?: LimiterData,
): Promise<Limiter> => {
  await audioContext.audioWorklet.addModule(limiterWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "limiter-processor", {
    channelCountMode: "explicit",
    outputChannelCount: [2],
    channelCount: 2,
  });

  return {
    inputs: {
      input: {
        port: workletNode,
        type: PortType.Audio,
      },
    },
    outputs: {
      output: {
        port: workletNode,
        type: PortType.Audio,
      },
    },
  };
};

export default limiter;
