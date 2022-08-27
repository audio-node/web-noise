//@ts-ignore
import whiteNoiseWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { WNAudioNode } from "@web-noise/core";

export interface WhiteNoise extends WNAudioNode {
  whiteNoise: AudioWorkletNode;
}

export const whiteNoise = async (audioContext: AudioContext): Promise<WhiteNoise> => {
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
