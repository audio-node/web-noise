//@ts-ignore
import whiteNoiseWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface WhiteNoise extends Node {
  whiteNoise: AudioDestinationNode;
}

const whiteNoise = async (audioContext: AudioContext) => {
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

export default whiteNoise
