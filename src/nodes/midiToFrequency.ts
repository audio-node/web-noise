//@ts-ignore
import sciptNodeWorklet from "worklet-loader!./math/worklet.ts"; // eslint-disable-line
import { Node } from "../ModuleContext";

const MidiToFrequency = async (audioContext: AudioContext): Promise<Node> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-processor", {
    processorOptions: {
      expression: '(B ? B : 440) * Math.pow(2, (A - 69) / 12)'
    }
  });

  return {
    outputs: {
      out: {
        port: mathNode,
      },
    },
    inputs: {
      midi: {
        port: mathNode.parameters.get("A")!,
      },
      tune: {
        port: mathNode.parameters.get("B")!,
      },
    },
  };
};

export default MidiToFrequency;
