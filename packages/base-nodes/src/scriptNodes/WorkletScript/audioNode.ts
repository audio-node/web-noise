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

  return {
    outputs: {
      output0: {
        port: [scriptNode, 0],
      },
      output1: {
        port: [scriptNode, 1],
      },
      output2: {
        port: [scriptNode, 2],
      },
      output3: {
        port: [scriptNode, 3],
      },
    },
    inputs: {
      A: {
        port: scriptNode.parameters.get("A")!,
      },
      B: {
        port: scriptNode.parameters.get("B")!,
      },
      C: {
        port: scriptNode.parameters.get("C")!,
      },
      X: {
        port: scriptNode.parameters.get("X")!,
      },
      Y: {
        port: scriptNode.parameters.get("Y")!,
      },
      Z: {
        port: scriptNode.parameters.get("Z")!,
      },
      input0: {
        port: [scriptNode, 0],
      },
      input1: {
        port: [scriptNode, 1],
      },
    },
    channel: scriptNode.port,
    setValues: ({ expression } = {}) => expression && runExpression(expression),
  };
};

export default scriptNode;
