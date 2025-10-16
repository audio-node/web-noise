import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";

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
        type: PortType.Any,
      },
    },
    outputs: {
      out: {
        port: passThroughNode,
        type: PortType.Any,
      },
    },
  };
};

export default passThrough;
