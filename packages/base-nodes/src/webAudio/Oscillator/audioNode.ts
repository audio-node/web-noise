import { type WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { OscillatorValues, OscillatorData } from "./types";

export interface Oscillator extends WNAudioNode {
  setValues: (values?: OscillatorValues) => void;
}

export const oscillator = async (
  audioContext: AudioContext,
  data?: OscillatorData,
): Promise<Oscillator> => {
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = 0;
  oscillator.start();

  return {
    inputs: {
      frequency: {
        port: oscillator.frequency,
        type: PortType.Number,
        range: [oscillator.frequency.minValue, oscillator.frequency.maxValue],
        defaultValue: oscillator.frequency.value,
      },
      detune: {
        port: oscillator.detune,
        type: PortType.Number,
        range: [oscillator.detune.minValue, oscillator.detune.maxValue],
        defaultValue: oscillator.detune.value,
      },
    },
    outputs: {
      out: {
        port: oscillator,
        type: PortType.Any,
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
