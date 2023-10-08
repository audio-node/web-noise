import { WNAudioNode } from "@web-noise/core";

export interface DynamicsCompressor extends WNAudioNode {}

export const dynamicsCompressor = async (
  audioContext: AudioContext,
): Promise<DynamicsCompressor> => {
  const compressor = audioContext.createDynamicsCompressor();

  return {
    inputs: {
      input: {
        port: compressor,
      },
      threshold: {
        port: compressor.threshold,
      },
      knee: {
        port: compressor.knee,
      },
      ratio: {
        port: compressor.ratio,
      },
      attack: {
        port: compressor.attack,
      },
      release: {
        port: compressor.release,
      },
    },
    outputs: {
      output: {
        port: compressor,
      },
    },
  };
};

export default dynamicsCompressor;
