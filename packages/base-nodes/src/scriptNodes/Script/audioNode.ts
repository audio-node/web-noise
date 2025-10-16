import type { AudioPort } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { IncomingMessageData, ScriptNode, ScriptNodeData } from "../types";
import transpile from "../transpile";

//@ts-ignore
import passThroughWorkerUrl from "worklet:../../webNoise/PassThrough/worklet.ts";
//@ts-ignore
import triggerWatcherWorkletUrl from "worklet:./triggerWatcher.worklet.ts";

const passThroughWorker = new URL(passThroughWorkerUrl, import.meta.url);
const triggerWatcherWorklet = new URL(
  triggerWatcherWorkletUrl,
  import.meta.url,
);

const INPUTS_COUNT = 4;
const OUTPUTS_COUNT = 4;

const createPassThroughNode = (audioContext: AudioContext) =>
  new AudioWorkletNode(audioContext, "pass-through-processor");

const createPassThroughNodes = (audioContext: AudioContext, length: number) =>
  Array.from(new Array(length), () => createPassThroughNode(audioContext));

const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

type TriggerWatcherPortEvent = { name: "triggered" } | { name: "untriggered" };

const scriptNode = async (
  audioContext: AudioContext,
  data?: ScriptNodeData,
): Promise<ScriptNode> => {
  await Promise.all([
    audioContext.audioWorklet.addModule(passThroughWorker),
    audioContext.audioWorklet.addModule(triggerWatcherWorklet),
  ]);

  const triggerWatcher = new AudioWorkletNode(
    audioContext,
    "trigger-watcher-processor",
  );

  triggerWatcher.port.start();

  const inputs = createPassThroughNodes(audioContext, INPUTS_COUNT);
  const outputs = createPassThroughNodes(audioContext, OUTPUTS_COUNT);

  let currentInputs: Array<AudioWorkletNode> = [];
  let currentOutputs: Array<AudioWorkletNode> = [];

  let currentOnTriggeredCallback: (() => void) | null = null;
  let currentOnUntriggeredCallback: (() => void) | null = null;

  triggerWatcher.port.addEventListener(
    "message",
    ({ data }: MessageEvent<TriggerWatcherPortEvent>) => {
      switch (data.name) {
        case "triggered":
          currentOnTriggeredCallback?.();
          break;
        case "untriggered":
          currentOnUntriggeredCallback?.();
          break;
      }
    },
  );

  const runExpression = async (expression: string) => {
    inputs.forEach((input, index) => input.disconnect(currentInputs[index]));
    currentOutputs.forEach((output, index) =>
      output.disconnect(outputs[index]),
    );

    currentOnTriggeredCallback = null;
    currentOnUntriggeredCallback = null;

    currentInputs = createPassThroughNodes(audioContext, INPUTS_COUNT);
    inputs.forEach((input, index) => input.connect(currentInputs[index]));

    currentOutputs = createPassThroughNodes(audioContext, OUTPUTS_COUNT);
    currentOutputs.forEach((output, index) => output.connect(outputs[index]));

    try {
      const expressionFn = new AsyncFunction(
        "ScriptSandbox",
        transpile(expression),
      );

      await expressionFn({
        onTriggered: (fn: () => void) => {
          currentOnTriggeredCallback = fn;
        },
        onUntriggered: (fn: () => void) => {
          currentOnUntriggeredCallback = fn;
        },
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

  const { expression } = data?.values || {};
  expression && runExpression(expression);

  return {
    inputs: {
      trigger: {
        port: triggerWatcher,
        type: PortType.Gate,
      },
      ...inputs.reduce(
        (acc, port, index) => ({
          ...acc,
          [`input${index}`]: {
            port,
            type: PortType.Any,
          },
        }),
        {},
      ),
    },
    outputs: outputs.reduce(
      (acc, port, index) => ({
        ...acc,
        [`output${index}`]: {
          port,
          type: PortType.Any,
        },
      }),
      {},
    ),
    destroy: () => {
      triggerWatcher.port.close();
    },
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

export default scriptNode;
