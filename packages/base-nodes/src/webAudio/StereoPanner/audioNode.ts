import { WNAudioNode } from "@web-noise/core";

export const stereoPanner = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  const panner = audioContext.createStereoPanner();

  return {
    inputs: {
      input: {
        port: panner,
      },
      pan: {
        port: panner.pan,
      },
    },
    outputs: {
      output: {
        port: panner,
      },
    },
  };
};

export default stereoPanner;
