import { IncomingMessageData, ScriptNode } from "../types";
import transpile from "../transpile";
const passThroughWorker = new URL(
  "../../audioNodes/passThrough/worklet.ts",
  import.meta.url
);

const INPUTS_COUNT = 4;
const OUTPUTS_COUNT = 4;

const createPassThroughNode = (audioContext: AudioContext) =>
  new AudioWorkletNode(audioContext, "pass-through-processor");

const createPassThroughNodes = (audioContext: AudioContext, length: number) =>
  Array.from(new Array(length), () => createPassThroughNode(audioContext));

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export const scriptNode = async (
  audioContext: AudioContext
): Promise<ScriptNode> => {
  await audioContext.audioWorklet.addModule(passThroughWorker);

  const inputs = createPassThroughNodes(audioContext, INPUTS_COUNT);
  const outputs = createPassThroughNodes(audioContext, OUTPUTS_COUNT);

  let currentInputs: Array<AudioWorkletNode> = [];
  let currentOutputs: Array<AudioWorkletNode> = [];

  const runExpression = async (expression: string) => {
    inputs.forEach((input, index) => input.disconnect(currentInputs[index]));
    currentOutputs.forEach((output, index) =>
      output.disconnect(outputs[index])
    );

    currentInputs = createPassThroughNodes(audioContext, INPUTS_COUNT);
    inputs.forEach((input, index) => input.connect(currentInputs[index]));

    currentOutputs = createPassThroughNodes(audioContext, OUTPUTS_COUNT);
    currentOutputs.forEach((output, index) => output.connect(outputs[index]));

    try {
      const expressionFn = new AsyncFunction(
        "ScriptSandbox",
        transpile(expression)
      );

      await expressionFn({
        inputs: currentInputs,
        outputs: currentOutputs,
        audioContext,
      });

      channel.port1.postMessage({
        name: "clean-error",
      });
    } catch (error) {
      channel.port1.postMessage({
        name: "error",
        error,
      });
    }
  };

  const channel = new MessageChannel();
  channel.port1.onmessage = ({ data }: MessageEvent<IncomingMessageData>) => {
    switch (data.name) {
      case "expression":
        runExpression(data.value);
        break;
    }
  };
  channel.port2.start();

  return {
    inputs: inputs.reduce(
      (acc, port, index) => ({ ...acc, [`input${index}`]: { port } }),
      {}
    ),
    outputs: outputs.reduce(
      (acc, port, index) => ({ ...acc, [`output${index}`]: { port } }),
      {}
    ),
    setValues: ({ expression } = {}) => {
      expression &&
        channel.port2.postMessage({
          name: "expression",
          value: expression,
        });
    },
    channel: channel.port2,
  };
};
