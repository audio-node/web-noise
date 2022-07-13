import { Node } from "../ModuleContext";

export interface FilterValues {
  frequency?: number;
  q?: number;
  type?: BiquadFilterType;
}

export interface Filter extends Node {
  filter: BiquadFilterNode;
  setValues: (values?: FilterValues) => void;
}

export const filter = (audioContext: AudioContext): Filter => {
  const filter = audioContext.createBiquadFilter();
    filter.gain.value = 10;
  return {
    inputs: {
      in: {
        port: filter,
      },
    },
    outputs: {
      out: {
        port: filter,
      },
    },
    setValues: ({ frequency, q, type } = {}) => {
      typeof frequency !== 'undefined' &&
        filter.frequency.setValueAtTime(
          frequency,
          audioContext.currentTime
        );
      typeof q !== 'undefined' &&
        filter.Q.setValueAtTime(
          q,
          audioContext.currentTime
        );
      type && (filter.type = type);
    },
    filter,
  };
};

export default filter;
