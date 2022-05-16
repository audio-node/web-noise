import { Node } from "../ModuleContext";

export interface Oscillator extends Node {
  oscillator: OscillatorNode;
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
    oscillator,
  };
};

export default oscillator;
