import { WNAudioNode } from "@web-noise/core";

const sciptNodeWorklet = new URL('./worklet.ts', import.meta.url);

export interface ScriptNodeValues {
  expression?: string;
}

export interface ScriptNode extends WNAudioNode {
  scriptNode: AudioWorkletNode;
  setValues: (values?: ScriptNodeValues) => void;
}

export const scriptNode = async (
  audioContext: AudioContext
): Promise<ScriptNode> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const scriptNode = new AudioWorkletNode(
    audioContext,
    "script-node-processor",
    {
      numberOfInputs: 2,
      numberOfOutputs: 4,
    }
  );

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
    setValues: ({ expression } = {}) =>
      expression &&
      scriptNode.port.postMessage({
        name: "expression",
        value: expression,
      }),
    scriptNode,
  };
};
