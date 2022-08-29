import { WNAudioNode } from "@web-noise/core";

const sciptNodeWorklet = new URL("./math/worklet.ts", import.meta.url);

export const midiToFrequency = async (
  audioContext: AudioContext
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-processor", {
    processorOptions: {
      expression: "(B ? B : 440) * Math.pow(2, (A - 69) / 12)",
    },
  });

  return {
    outputs: {
      out: {
        port: mathNode,
      },
    },
    inputs: {
      midi: {
        port: mathNode.parameters.get("A")!,
      },
      tune: {
        port: mathNode.parameters.get("B")!,
      },
    },
  };
};
