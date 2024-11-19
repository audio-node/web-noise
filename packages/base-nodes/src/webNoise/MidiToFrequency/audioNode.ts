import { MidiToFrequencyData, MidiToFrequency } from "./types";

//@ts-ignore
import sciptNodeWorkletUrl from "worklet:../MathNode/worklet.ts";
const sciptNodeWorklet = new URL(sciptNodeWorkletUrl, import.meta.url);

export const midiToFrequency = async (
  audioContext: AudioContext,
  data?: MidiToFrequencyData,
): Promise<MidiToFrequency> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-node-processor", {
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

export default midiToFrequency;
