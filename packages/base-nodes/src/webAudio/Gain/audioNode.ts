import { PortType, WNAudioNode } from "@web-noise/core";

export interface Gain extends WNAudioNode {}

export const gain = async (audioContext: AudioContext): Promise<Gain> => {
  const gain = audioContext.createGain();
  gain.gain.value = 0;

  return {
    inputs: {
      in: {
        port: gain,
        type: PortType.Any,
      },
      gain: {
        port: gain.gain,
        type: PortType.Number,
        range: [gain.gain.minValue, gain.gain.maxValue],
        defaultValue: gain.gain.value,
      },
    },
    outputs: {
      out: {
        type: PortType.Any,
        port: gain,
      },
    },
  };
};

export default gain;
