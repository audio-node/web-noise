import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import whiteNoiseWorkletUrl from "worklet:./worklet.ts";

const whiteNoiseWorklet = new URL(whiteNoiseWorkletUrl, import.meta.url);

export interface WhiteNoise extends WNAudioNode {}

export const whiteNoise = async (
  audioContext: AudioContext,
): Promise<WhiteNoise> => {
  await audioContext.audioWorklet.addModule(whiteNoiseWorklet);
  const whiteNoise = new AudioWorkletNode(
    audioContext,
    "white-noise-processor",
  );

  return {
    outputs: {
      out: {
        port: whiteNoise,
      },
    },
  };
};

export default whiteNoise;
