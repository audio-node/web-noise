import { WNAudioNode } from "@web-noise/core";

export interface Gain extends WNAudioNode {}

export const gain = async (audioContext: AudioContext): Promise<Gain> => {
  const gain = audioContext.createGain();
  gain.gain.value = 0;

  return {
    inputs: {
      in: {
        port: gain,
      },
      gain: {
        port: gain.gain,
      },
    },
    outputs: {
      out: {
        port: gain,
      },
    },
  };
};

export default gain;
