import { Node } from "../ModuleContext";

export interface ConstantSourceValues {
  value?: number;
}

export interface ConstantSource extends Node {
  constantSource: ConstantSourceNode;
  setValues: (values?: ConstantSourceValues) => void;
}

export const constantSource = (audioContext: AudioContext): ConstantSource => {
  const constantSource = audioContext.createConstantSource();
  constantSource.start();

  return {
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
