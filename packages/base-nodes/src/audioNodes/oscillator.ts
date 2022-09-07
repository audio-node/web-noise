import { WNAudioNode } from "@web-noise/core";

export interface OscillatorValues {
  frequency?: number;
  type?: OscillatorType;
}

export interface Oscillator extends WNAudioNode {
  oscillator: OscillatorNode;
  setValues: (values?: OscillatorValues) => void;
}

export const oscillator = (audioContext: AudioContext): Oscillator => {
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
    setValues: ({ frequency, type } = {}) => {
      typeof frequency !== 'undefined' &&
        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
      type && (oscillator.type = type);
    },
    oscillator,
  };
};
