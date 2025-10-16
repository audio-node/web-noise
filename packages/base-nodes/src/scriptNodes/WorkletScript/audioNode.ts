import type { AudioPort } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { ScriptNode, ScriptNodeValues, ScriptNodeData } from "../types";

//@ts-ignore
import sciptNodeWorkletUrl from "worklet:./worklet.ts";

const sciptNodeWorklet = new URL(sciptNodeWorkletUrl, import.meta.url);

const scriptNode = async (
  audioContext: AudioContext,
  data?: ScriptNodeData,
): Promise<ScriptNode> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const scriptNode = new AudioWorkletNode(
    audioContext,
    "script-node-processor",
    {
      numberOfInputs: 2,
      numberOfOutputs: 4,
    },
  );

  scriptNode.port.start();

  const runExpression = (expression: ScriptNodeValues["expression"]) => {
    scriptNode.port.postMessage({
      name: "expression",
      value: expression,
    });
  };

  const { expression } = data?.values || {};
  expression && runExpression(expression);

  const A = scriptNode.parameters.get("A")!;
  const B = scriptNode.parameters.get("B")!;
  const C = scriptNode.parameters.get("C")!;
  const X = scriptNode.parameters.get("X")!;
  const Y = scriptNode.parameters.get("Y")!;
  const Z = scriptNode.parameters.get("Z")!;

  return {
    outputs: {
      output0: {
        port: [scriptNode, 0],
        type: PortType.Audio,
      },
      output1: {
        port: [scriptNode, 1],
        type: PortType.Audio,
      },
      output2: {
        port: [scriptNode, 2],
        type: PortType.Audio,
      },
      output3: {
        port: [scriptNode, 3],
        type: PortType.Audio,
      },
    },
    inputs: {
      A: {
        port: A,
        range: [A.minValue, A.maxValue],
        defaultValue: A.value,
        type: PortType.Number,
      },
      B: {
        port: B,
        range: [B.minValue, B.maxValue],
        defaultValue: B.value,
        type: PortType.Number,
      },
      C: {
        port: C,
        range: [C.minValue, C.maxValue],
        defaultValue: C.value,
        type: PortType.Number,
      },
      X: {
        port: X,
        range: [X.minValue, X.maxValue],
        defaultValue: X.value,
        type: PortType.Number,
      },
      Y: {
        port: Y,
        range: [Y.minValue, Y.maxValue],
        defaultValue: Y.value,
        type: PortType.Number,
      },
      Z: {
        port: Z,
        range: [Z.minValue, Z.maxValue],
        defaultValue: Z.value,
        type: PortType.Number,
      },
      input0: {
        port: [scriptNode, 0],
        type: PortType.Any,
      },
      input1: {
        port: [scriptNode, 1],
        type: PortType.Any,
      },
    },
    channel: scriptNode.port,
    setValues: ({ expression } = {}) => expression && runExpression(expression),
  };
};

export default scriptNode;
