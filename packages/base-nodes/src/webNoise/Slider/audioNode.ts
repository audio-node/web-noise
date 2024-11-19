import { WNAudioNode } from "@web-noise/core";
import { SliderValues, SliderData } from "./types";


export interface Slider extends WNAudioNode {
  setValues: (values?: SliderValues) => void;
}

export const slider = async (
  audioContext: AudioContext,
  data?: SliderData
): Promise<Slider> => {

  const constantSource = audioContext.createConstantSource();
  constantSource.offset.value = data?.values?.value ?? 0;
  constantSource.start();

  return {
    inputs: {
      offset: {
        port: constantSource.offset,
      },
    },
    outputs: {
      output: {
        port: constantSource,
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
