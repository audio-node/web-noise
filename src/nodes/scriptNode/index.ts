//@ts-ignore
import sciptNodeWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface ScriptNode extends Node {
  scriptNode: AudioWorkletNode;
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
      in: {
        port: scriptNode,
      },
    },
    setExpression: (value: string) =>
      scriptNode.port.postMessage({
        name: "expression",
        value,
      }),
    scriptNode,
  };
};

export default scriptNode;
