//@ts-ignore
import sciptNodeWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface MathNodeValues {
  expression?: string;
}

export interface MathNode extends Node {
  mathNode: AudioWorkletNode;
  setValues: (values?: MathNodeValues) => void;
}

const scriptNode = async (audioContext: AudioContext): Promise<MathNode> => {
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

export default scriptNode;
