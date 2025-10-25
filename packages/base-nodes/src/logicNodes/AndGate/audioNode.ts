import { PortType } from "@web-noise/core/constants";
import {
  AndGateValues,
  AndGateData,
  AndGate,
  AndGateParameters,
} from "./types";

//@ts-ignore
import andGateWorkletUrl from "worklet:./worklet.ts";
const andGateWorklet = new URL(andGateWorkletUrl, import.meta.url);

export const andGate = async (
  audioContext: AudioContext,
  data?: AndGateData,
): Promise<AndGate> => {
  await audioContext.audioWorklet.addModule(andGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "and-gate-processor");

  const A = workletNode.parameters.get(AndGateParameters.A)!;
  const B = workletNode.parameters.get(AndGateParameters.B)!;

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

export default andGate;
