import { PortType } from "@web-noise/core/constants";
import {
  XorGateValues,
  XorGateData,
  XorGate,
  XorGateParameters,
} from "./types";

//@ts-ignore
import xorGateWorkletUrl from "worklet:./worklet.ts";
const xorGateWorklet = new URL(xorGateWorkletUrl, import.meta.url);

export const xorGate = async (
  audioContext: AudioContext,
  data?: XorGateData,
): Promise<XorGate> => {
  await audioContext.audioWorklet.addModule(xorGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "xor-gate-processor");

  const A = workletNode.parameters.get(XorGateParameters.A)!;
  const B = workletNode.parameters.get(XorGateParameters.B)!;

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

export default xorGate;
