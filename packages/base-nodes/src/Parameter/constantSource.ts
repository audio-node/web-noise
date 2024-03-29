import { WNAudioNode } from "@web-noise/core";

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
      },
    },
    outputs: {
      out: {
        port: constantSource,
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
