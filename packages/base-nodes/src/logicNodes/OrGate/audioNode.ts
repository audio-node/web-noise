import { PortType } from "@web-noise/core/constants";
import {
  OrGateValues,
  OrGateData,
  OrGate,
  OrGateParameters,
} from "./types";

//@ts-ignore
import orGateWorkletUrl from "worklet:./worklet.ts";
const orGateWorklet = new URL(orGateWorkletUrl, import.meta.url);

export const orGate = async (
  audioContext: AudioContext,
  data?: OrGateData,
): Promise<OrGate> => {
  await audioContext.audioWorklet.addModule(orGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "or-gate-processor");

  const A = workletNode.parameters.get(OrGateParameters.A)!;
  const B = workletNode.parameters.get(OrGateParameters.B)!;

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

export default orGate;
