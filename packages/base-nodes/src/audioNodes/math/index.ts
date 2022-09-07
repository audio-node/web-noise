import { WNAudioNode } from "@web-noise/core";

const sciptNodeWorklet = new URL('./worklet.ts', import.meta.url);

export interface MathNodeValues {
  expression?: string;
}

export interface MathNode extends WNAudioNode {
  mathNode: AudioWorkletNode;
  setValues: (values?: MathNodeValues) => void;
}

export const math = async (audioContext: AudioContext): Promise<MathNode> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-processor");

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

export default math;
