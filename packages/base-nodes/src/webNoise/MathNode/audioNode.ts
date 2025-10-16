import { PortType } from "@web-noise/core/constants";
import { MathNodeData, MathNode, MathNodeParameters } from "./types";

//@ts-ignore
import mathNodeWorkletUrl from "worklet:./worklet.ts";

const mathNodeWorklet = new URL(mathNodeWorkletUrl, import.meta.url);

export const mathNode = async (
  audioContext: AudioContext,
  data?: MathNodeData,
): Promise<MathNode> => {
  await audioContext.audioWorklet.addModule(mathNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-node-processor");

  const A = mathNode.parameters.get(MathNodeParameters.A)!;
  const B = mathNode.parameters.get(MathNodeParameters.B)!;
  const C = mathNode.parameters.get(MathNodeParameters.C)!;
  const X = mathNode.parameters.get(MathNodeParameters.X)!;
  const Y = mathNode.parameters.get(MathNodeParameters.Y)!;
  const Z = mathNode.parameters.get(MathNodeParameters.Z)!;

  return {
    outputs: {
      out: {
        port: mathNode,
        type: PortType.Any,
      },
    },
    inputs: {
      A: {
        port: A,
        type: PortType.Number,
        range: [A.minValue, A.maxValue],
        defaultValue: A.value,
      },
      B: {
        port: B,
        type: PortType.Number,
        range: [B.minValue, B.maxValue],
        defaultValue: B.value,
      },
      C: {
        port: C,
        type: PortType.Number,
        range: [C.minValue, C.maxValue],
        defaultValue: C.value,
      },
      X: {
        port: X,
        type: PortType.Number,
        range: [X.minValue, X.maxValue],
        defaultValue: X.value,
      },
      Y: {
        port: Y,
        type: PortType.Number,
        range: [Y.minValue, Y.maxValue],
        defaultValue: Y.value,
      },
      Z: {
        port: Z,
        type: PortType.Number,
        range: [Z.minValue, Z.maxValue],
        defaultValue: Z.value,
      },
      INPUT: {
        port: mathNode,
        type: PortType.Any,
      },
    },
    setValues: ({ expression } = {}) =>
      expression &&
      mathNode.port.postMessage({
        name: "expression",
        value: expression,
      }),
  };
};

export default mathNode;
