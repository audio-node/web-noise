import { PortType } from "@web-noise/core/constants";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { SequencerValues, SequencerData, Sequencer } from "./types";

//@ts-ignore
import sequencerWorkletUrl from "worklet:./worklet.ts";
const sequencerWorklet = new URL(sequencerWorkletUrl, import.meta.url);

export const sequencer = async (
  audioContext: AudioContext,
  data?: SequencerData,
): Promise<Sequencer> => {
  await audioContext.audioWorklet.addModule(sequencerWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "sequencer-processor",
    {
      numberOfOutputs: 3,
    },
  );

  const gate = workletNode.parameters.get("gate")!;
  const reset = workletNode.parameters.get("reset")!;

  return {
    inputs: {
      gate: {
        port: gate,
        type: PortType.Gate,
        range: [gate.minValue, gate.maxValue],
        defaultValue: gate.value,
      },
      reset: {
        port: reset,
        type: PortType.Gate,
        range: [reset.minValue, reset.maxValue],
        defaultValue: reset.value,
      },
    },
    outputs: {
      gate: {
        port: [workletNode, 0],
        type: PortType.Gate,
        range: [0, 1],
        defaultValue: 0,
      },
      note: {
        port: [workletNode, 1],
        type: PortType.Number,
        range: [0, 127],
        defaultValue: 0,
      },
      index: {
        port: [workletNode, 2],
        type: PortType.Number,
        range: [0, Infinity],
        defaultValue: 0,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(workletNode.port, port);
      return workletNode.port;
    },
    setValues: ({ sequence } = {}) => {
      if (typeof sequence !== "undefined") {
        workletNode.port.postMessage({ name: "SET_SEQUENCE", data: sequence });
      }
    },
  };
};

export default sequencer;
