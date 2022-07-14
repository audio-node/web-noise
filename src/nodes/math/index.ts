//@ts-ignore
import sciptNodeWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface MathNode extends Node {
  mathNode: AudioWorkletNode;
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
      INPUT: {
        port: mathNode,
      },
    },
    setExpression: (value: string) =>
      mathNode.port.postMessage({
        name: "expression",
        value,
      }),
    mathNode,
  };
};

export default scriptNode;
