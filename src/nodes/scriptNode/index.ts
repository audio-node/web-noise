//@ts-ignore
import sciptNodeWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface ScriptNodeValues {
  expression?: string;
}

export interface ScriptNode extends Node {
  scriptNode: AudioWorkletNode;
  setValues: (values?: ScriptNodeValues) => void;
}

const scriptNode = async (audioContext: AudioContext): Promise<ScriptNode> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const scriptNode = new AudioWorkletNode(
    audioContext,
    "script-node-processor"
  );

  return {
    outputs: {
      out: {
        port: scriptNode,
      },
    },
    inputs: {
      A: {
        port: scriptNode.parameters.get('A')!,
      },
      B: {
        port: scriptNode.parameters.get('B')!,
      },
      C: {
        port: scriptNode.parameters.get('C')!,
      },
      in: {
        port: scriptNode,
      },
    },
    setValues: ({ expression } = {}) =>
      expression && scriptNode.port.postMessage({
        name: "expression",
        value: expression,
      }),
    scriptNode,
  };
};

export default scriptNode;
