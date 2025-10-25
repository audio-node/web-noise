import { PortType } from "@web-noise/core/constants";
import {
  NotGateValues,
  NotGateData,
  NotGate,
  NotGateParameters,
} from "./types";

//@ts-ignore
import notGateWorkletUrl from "worklet:./worklet.ts";
const notGateWorklet = new URL(notGateWorkletUrl, import.meta.url);

export const notGate = async (
  audioContext: AudioContext,
  data?: NotGateData,
): Promise<NotGate> => {
  await audioContext.audioWorklet.addModule(notGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "not-gate-processor");

  const A = workletNode.parameters.get(NotGateParameters.A)!;

  return {
    inputs: {
      A: {
        port: A,
        type: PortType.Gate,
        range: [A.minValue, A.maxValue],
        defaultValue: A.value,
      },
    },
    outputs: {
      Q: {
        port: workletNode,
        type: PortType.Gate,
        range: [A.minValue, A.maxValue],
      },
    },
  };
};

export default notGate;
