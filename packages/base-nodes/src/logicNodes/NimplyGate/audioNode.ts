import { PortType } from "@web-noise/core/constants";
import {
  NimplyGateValues,
  NimplyGateData,
  NimplyGate,
  NimplyGateParameters,
} from "./types";

//@ts-ignore
import nimplyGateWorkletUrl from "worklet:./worklet.ts";
const nimplyGateWorklet = new URL(nimplyGateWorkletUrl, import.meta.url);

export const nimplyGate = async (
  audioContext: AudioContext,
  data?: NimplyGateData,
): Promise<NimplyGate> => {
  await audioContext.audioWorklet.addModule(nimplyGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "nimply-gate-processor");

  const A = workletNode.parameters.get(NimplyGateParameters.A)!;
  const B = workletNode.parameters.get(NimplyGateParameters.B)!;

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

export default nimplyGate;
