import { PortType } from "@web-noise/core/constants";
import {
  NandGateValues,
  NandGateData,
  NandGate,
  NandGateParameters,
} from "./types";

//@ts-ignore
import nandGateWorkletUrl from "worklet:./worklet.ts";
const nandGateWorklet = new URL(nandGateWorkletUrl, import.meta.url);

export const nandGate = async (
  audioContext: AudioContext,
  data?: NandGateData,
): Promise<NandGate> => {
  await audioContext.audioWorklet.addModule(nandGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "nand-gate-processor");

  const A = workletNode.parameters.get(NandGateParameters.A)!;
  const B = workletNode.parameters.get(NandGateParameters.B)!;

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

export default nandGate;
