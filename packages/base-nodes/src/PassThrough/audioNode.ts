import type { WNAudioNode } from "@web-noise/core";

export interface PassThrough extends WNAudioNode {}

export const passThrough = async (
  audioContext: AudioContext,
): Promise<PassThrough> => {
  const passThroughNode = audioContext.createGain();
  passThroughNode.gain.value = 1;

  return {
    inputs: {
      in: {
        port: passThroughNode,
      },
    },
    outputs: {
      out: {
        port: passThroughNode,
      },
    },
  };
};

export default passThrough;
