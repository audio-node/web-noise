import { WNAudioNode } from "@web-noise/core";
import { OscillatorValues, OscillatorData } from "./types";

export interface Oscillator extends WNAudioNode {
  setValues: (values?: OscillatorValues) => void;
}

export const oscillator = async (
  audioContext: AudioContext,
  data?: OscillatorData
): Promise<Oscillator> => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = 0;
  oscillator.start();
  return {
    inputs: {
      frequency: {
        port: oscillator.frequency,
      },
      detune: {
        port: oscillator.detune,
      },
    },
    outputs: {
      out: {
        port: oscillator,
      },
    },
    destroy: () => {
      oscillator.stop();
    },
    setValues: ({ type } = {}) => {
      type && (oscillator.type = type);
    },
    oscillator,
  };
};

export default oscillator;
