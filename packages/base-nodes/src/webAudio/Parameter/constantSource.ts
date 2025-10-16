import { type WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";

export interface ConstantSourceValues {
  value?: number;
}

export interface ConstantSource extends WNAudioNode {
  constantSource: ConstantSourceNode;
  setValues: (values?: ConstantSourceValues) => void;
}

export const constantSource = (audioContext: AudioContext): ConstantSource => {
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
