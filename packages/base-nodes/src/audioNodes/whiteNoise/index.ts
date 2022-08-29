import { WNAudioNode } from "@web-noise/core";

const whiteNoiseWorklet = new URL("./worklet.ts", import.meta.url);

export interface WhiteNoise extends WNAudioNode {
  whiteNoise: AudioWorkletNode;
}

export const whiteNoise = async (
  audioContext: AudioContext
): Promise<WhiteNoise> => {
  await audioContext.audioWorklet.addModule(whiteNoiseWorklet);
  const whiteNoise = new AudioWorkletNode(
    audioContext,
    "white-noise-processor"
  );

  return {
    outputs: {
      out: {
        port: whiteNoise,
      },
    },
    whiteNoise,
  };
};
