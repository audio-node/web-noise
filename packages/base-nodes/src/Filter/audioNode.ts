import { WNAudioNode } from "@web-noise/core";
import { FilterValues, FilterData } from "./types";

export interface Filter extends WNAudioNode {
  setValues: (values?: FilterValues) => void;
}

export const filter = async (
  audioContext: AudioContext,
  data?: FilterData,
): Promise<Filter> => {
  const filter = audioContext.createBiquadFilter();

  const { type } = data?.values || {};
  if (type) {
    filter.type = type;
  }

  return {
    inputs: {
      in: {
        port: filter,
      },
      frequency: {
        port: filter.frequency,
      },
      detune: {
        port: filter.detune,
      },
      Q: {
        port: filter.Q,
      },
      gain: {
        port: filter.gain,
      },
    },
    outputs: {
      out: {
        port: filter,
      },
    },
    setValues: ({ type } = {}) => {
      type && (filter.type = type);
    },
    filter,
  };
};

export default filter;
