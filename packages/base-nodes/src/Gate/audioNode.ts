import { WNNodeData, WNAudioNode } from "@web-noise/core";
import { GateValues } from "./types";

export interface Gate extends WNAudioNode {
  open?: () => void;
  close?: () => void;
  setValues: (values?: GateValues) => void;
}

export const gate = (
  audioContext: AudioContext,
  data: WNNodeData<GateValues>
): Gate => {
  const constantSource = audioContext.createConstantSource();
  constantSource.offset.value = +(data.values?.isOpened ?? false);
  constantSource.start();

  return {
    outputs: {
      out: {
        port: constantSource,
      },
    },
    setValues: ({ isOpened } = {}) => {
      typeof isOpened !== "undefined" &&
        constantSource.offset.setValueAtTime(
          +isOpened,
          audioContext.currentTime
        );
    },
    open: () => {},
    close: () => {},
  };
};

export default gate;
