import { Node } from "../ModuleContext";

export interface Oscillator extends Node {
  oscillator: OscillatorNode;
}

const oscillator = (audioContext: AudioContext): Oscillator => {
  const oscillator = audioContext.createOscillator();
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
    oscillator,
  };
};

export default oscillator;
