import { PortType } from "@web-noise/core/constants";
import {
  XnorGateValues,
  XnorGateData,
  XnorGate,
  XnorGateParameters,
} from "./types";

//@ts-ignore
import xnorGateWorkletUrl from "worklet:./worklet.ts";
const xnorGateWorklet = new URL(xnorGateWorkletUrl, import.meta.url);

export const xnorGate = async (
  audioContext: AudioContext,
  data?: XnorGateData,
): Promise<XnorGate> => {
  await audioContext.audioWorklet.addModule(xnorGateWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "xnor-gate-processor");

  const A = workletNode.parameters.get(XnorGateParameters.A)!;
  const B = workletNode.parameters.get(XnorGateParameters.B)!;

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

export default xnorGate;
