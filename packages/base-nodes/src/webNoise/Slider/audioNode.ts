import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { SliderValues, SliderData } from "./types";

export interface Slider extends WNAudioNode {
  setValues: (values?: SliderValues) => void;
}

export const slider = async (
  audioContext: AudioContext,
  data?: SliderData,
): Promise<Slider> => {
  const constantSource = audioContext.createConstantSource();
  constantSource.offset.value = data?.values?.value ?? 0;
  constantSource.start();

  const offset = constantSource.offset;

  return {
    inputs: {
      offset: {
        port: offset,
        type: PortType.Number,
        range: [offset.minValue, offset.maxValue],
        defaultValue: offset.value,
      },
    },
    outputs: {
      output: {
        port: constantSource,
        type: PortType.Number,
        range: [offset.minValue, offset.maxValue],
        defaultValue: constantSource.offset.value,
      },
    },
    setValues: ({ value } = {}) => {
      if (typeof value !== "undefined") {
        constantSource.offset.value = value;
      }
    },
  };
};

export default slider;
