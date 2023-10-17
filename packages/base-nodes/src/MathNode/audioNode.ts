import { WNAudioNode } from "@web-noise/core";
import { MathNodeValues, MathNodeData } from "./types";

//@ts-ignore
import mathNodeWorkletUrl from "worklet:./worklet.ts";

const mathNodeWorklet = new URL(mathNodeWorkletUrl, import.meta.url);

export interface MathNode extends WNAudioNode {
  setValues: (values?: MathNodeValues) => void;
}

export const mathNode = async (
  audioContext: AudioContext,
  data?: MathNodeData
): Promise<MathNode> => {
  await audioContext.audioWorklet.addModule(mathNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-node-processor");

  return {
    outputs: {
      out: {
        port: mathNode,
      },
    },
    inputs: {
      A: {
        port: mathNode.parameters.get("A")!,
      },
      B: {
        port: mathNode.parameters.get("B")!,
      },
      C: {
        port: mathNode.parameters.get("C")!,
      },
      X: {
        port: mathNode.parameters.get("X")!,
      },
      Y: {
        port: mathNode.parameters.get("Y")!,
      },
      Z: {
        port: mathNode.parameters.get("Z")!,
      },
      INPUT: {
        port: mathNode,
      },
    },
    setValues: ({ expression } = {}) =>
      expression &&
      mathNode.port.postMessage({
        name: "expression",
        value: expression,
      }),
    mathNode,
  };
};

export default mathNode;
