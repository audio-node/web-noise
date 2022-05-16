import { Node } from "../ModuleContext";

export interface Oscillator extends Node {
  oscillator: OscillatorNode;
  setValues: (values: { frequency?: number; type?: OscillatorType }) => void;
}

const oscillator = (audioContext: AudioContext): Oscillator => {
  const oscillator = audioContext.createOscillator();
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
    setValues: ({ frequency, type }) => {
      frequency &&
        oscillator.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
      type && (oscillator.type = type);
    },
    oscillator,
  };
};

export default oscillator;
