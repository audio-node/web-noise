//@ts-ignore
import signalGeneratorWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface SignalGenerator extends Node {
  signalGenerator: AudioWorkletNode;
}

const signalGenerator = async (
  audioContext: AudioContext
): Promise<SignalGenerator> => {
  await audioContext.audioWorklet.addModule(signalGeneratorWorklet);
  const signalGenerator = new AudioWorkletNode(
    audioContext,
    "signal-generator-processor"
  );

  return {
    outputs: {
      out: {
        port: signalGenerator,
      },
    },
    inputs: {
      in: {
        port: signalGenerator,
      },
    },
    setExpression: (value: string) =>
      signalGenerator.port.postMessage({
        name: "expression",
        value,
      }),
    signalGenerator,
  };
};

export default signalGenerator;
