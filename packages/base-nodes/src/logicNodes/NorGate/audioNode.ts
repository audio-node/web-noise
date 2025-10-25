import { PortType } from "@web-noise/core/constants";
import {
  NorGateValues,
  NorGateData,
  NorGate,
  NorGateParameters,
} from "./types";

//@ts-ignore
import norGateWorkletUrl from "worklet:./worklet.ts";
const norGateWorklet = new URL(norGateWorkletUrl, import.meta.url);

export const norGate = async (
  audioContext: AudioContext,
  data?: NorGateData,
): Promise<NorGate> => {
  await audioContext.audioWorklet.addModule(norGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "nor-gate-processor");

  const A = workletNode.parameters.get(NorGateParameters.A)!;
  const B = workletNode.parameters.get(NorGateParameters.B)!;

  return {
    inputs: {
      A: {
        port: A,
        type: PortType.Gate,
        range: [A.minValue, A.maxValue],
        defaultValue: A.value,
      },
      B: {
        port: B,
        type: PortType.Gate,
        range: [B.minValue, B.maxValue],
        defaultValue: B.value,
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

export default norGate;
