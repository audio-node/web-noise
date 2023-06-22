---
to: src/<%= name %>/audioNode.ts
---
import { WNAudioNode } from "@web-noise/core";
import { <%= componentName %>Values, <%= componentName %>Data } from "./types";

const <%= componentType %>Worklet = new URL("./worklet.ts", import.meta.url);

export interface <%= componentName %> extends WNAudioNode {
  setValues: (values?: <%= componentName %>Values) => void;
}

export const <%= componentType %> = async (
  audioContext: AudioContext,
  data: <%= componentName %>Data
): Promise<<%= componentName %>> => {
  await audioContext.audioWorklet.addModule(<%= componentType %>Worklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "<%= componentType %>-processor"
  );

  const constantSource = audioContext.createConstantSource();
  constantSource.start();

  return {
    outputs: {
      out: {
        port: constantSource,
      },
      worklet: {
        port: workletNode,
      },
    },
    setValues: ({ value } = {}) => {
      if (typeof value !== "undefined") {
        constantSource.offset.value = value;
      }
    },
  };
};

export default <%= componentType %>;
