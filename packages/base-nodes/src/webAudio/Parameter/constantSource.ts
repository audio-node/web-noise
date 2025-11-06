import { PortType } from "@web-noise/core/constants";
import { ParameterAudioNode } from "./types";

export const constantSource = (audioContext: AudioContext): ParameterAudioNode => {
  const constantSource = audioContext.createConstantSource();
  constantSource.offset.value = 0;
  constantSource.start();

  return {
    inputs: {
      offset: {
        port: constantSource.offset,
        type: PortType.Number,
        range: [constantSource.offset.minValue, constantSource.offset.maxValue],
        defaultValue: constantSource.offset.value,
      },
    },
    outputs: {
      out: {
        port: constantSource,
        type: PortType.Number,
      },
    },
    constantSource,
    destroy: () => {
      constantSource.stop();
    },
    setValues: ({ value } = {}) => {
      typeof value !== "undefined" &&
        constantSource.offset.setValueAtTime(value, audioContext.currentTime);
    },
  };
};

export default constantSource;
