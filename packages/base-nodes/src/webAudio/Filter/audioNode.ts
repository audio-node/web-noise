import { PortType, WNAudioNode } from "@web-noise/core";
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
        type: PortType.Audio,
      },
      frequency: {
        port: filter.frequency,
        type: PortType.Number,
        range: [filter.frequency.minValue, filter.frequency.maxValue],
        defaultValue: filter.frequency.value,
      },
      detune: {
        port: filter.detune,
        type: PortType.Number,
        range: [filter.detune.minValue, filter.detune.maxValue],
        defaultValue: filter.detune.value,
      },
      Q: {
        port: filter.Q,
        type: PortType.Number,
        range: [filter.Q.minValue, filter.Q.maxValue],
        defaultValue: filter.Q.value,
      },
      gain: {
        port: filter.gain,
        type: PortType.Number,
        range: [filter.gain.minValue, filter.gain.maxValue],
        defaultValue: filter.gain.value,
      },
    },
    outputs: {
      out: {
        port: filter,
        type: PortType.Audio,
      },
    },
    setValues: ({ type } = {}) => {
      type && (filter.type = type);
    },
    filter,
  };
};

export default filter;
