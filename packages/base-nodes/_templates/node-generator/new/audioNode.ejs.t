---
to: src/<%= componentFolder %>/audioNode.ts
skip_if: <%= !hasAudioNode %>
---
import { WNAudioNode } from "@web-noise/core";
import { <%= componentName %>Values, <%= componentName %>Data } from "./types";

<% if(hasWorklet){ -%>
//@ts-ignore
import <%= componentType %>WorkletUrl from "worklet:./worklet.ts";
const <%= componentType %>Worklet = new URL(<%= componentType %>WorkletUrl, import.meta.url);
<% } -%>

export interface <%= componentName %> extends WNAudioNode {
  setValues: (values?: <%= componentName %>Values) => void;
}

export const <%= componentType %> = async (
  audioContext: AudioContext,
  data?: <%= componentName %>Data
): Promise<<%= componentName %>> => {
<% if(hasWorklet){ -%>
  await audioContext.audioWorklet.addModule(<%= componentType %>Worklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "<%= componentType %>-processor"
  );
<% } -%>

  const constantSource = audioContext.createConstantSource();
  constantSource.start();

  return {
    inputs: {
<% if(hasWorklet){ -%>
      input: {
        port: workletNode,
      },
<% } -%>
      offset: {
        port: constantSource.offset,
      },
    },
    outputs: {
      output: {
        port: constantSource,
      },
<% if(hasWorklet){ -%>
      workletOutput: {
        port: workletNode,
      },
<% } -%>
    },
    setValues: ({ value } = {}) => {
      if (typeof value !== "undefined") {
        constantSource.offset.value = value;
      }
    },
  };
};

export default <%= componentType %>;
