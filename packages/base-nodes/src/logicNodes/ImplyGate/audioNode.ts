import { PortType } from "@web-noise/core/constants";
import {
  ImplyGateValues,
  ImplyGateData,
  ImplyGate,
  ImplyGateParameters,
} from "./types";

//@ts-ignore
import implyGateWorkletUrl from "worklet:./worklet.ts";
const implyGateWorklet = new URL(implyGateWorkletUrl, import.meta.url);

export const implyGate = async (
  audioContext: AudioContext,
  data?: ImplyGateData,
): Promise<ImplyGate> => {
  await audioContext.audioWorklet.addModule(implyGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "imply-gate-processor");

  const A = workletNode.parameters.get(ImplyGateParameters.A)!;
  const B = workletNode.parameters.get(ImplyGateParameters.B)!;

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

export default implyGate;
