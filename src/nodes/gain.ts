import { Node } from "../ModuleContext";

export interface GainValues {
  gain?: number;
}

export interface Gain extends Node {
  gain: GainNode;
  setValues: (values?: GainValues) => void;
}

export const gain = (audioContext: AudioContext): Gain => {
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
    gain,
    setValues: ({ gain: gainValue } = {}) => {
      typeof gainValue !== "undefined" &&
        gain.gain.setValueAtTime(gainValue, audioContext.currentTime);
    },
  };
};

export default gain;
