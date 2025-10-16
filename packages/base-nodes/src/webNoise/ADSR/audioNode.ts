import { type WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { ADSRData, ADSRParameters } from "./types";

//@ts-ignore
import adsrWorkletUrl from "worklet:./worklet.ts";
const adsrWorklet = new URL(adsrWorkletUrl, import.meta.url);

export interface ADSR extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}

export const adsr = async (
  audioContext: AudioContext,
  data?: ADSRData,
): Promise<ADSR> => {
  await audioContext.audioWorklet.addModule(adsrWorklet);
  const adsr = new AudioWorkletNode(audioContext, "adsr-processor");

  const trigger = adsr.parameters.get(ADSRParameters.Trigger)!;
  const A = adsr.parameters.get(ADSRParameters.A)!;
  const attackCurve = adsr.parameters.get(ADSRParameters.AttackCurve)!;
  const D = adsr.parameters.get(ADSRParameters.D)!;
  const S = adsr.parameters.get(ADSRParameters.S)!;
  const R = adsr.parameters.get(ADSRParameters.R)!;

  return {
    inputs: {
      trigger: {
        port: trigger,
        type: PortType.Gate,
        range: [trigger.minValue, trigger.maxValue],
        defaultValue: trigger.value,
      },
      A: {
        port: A,
        type: PortType.Number,
        range: [A.minValue, A.maxValue],
        defaultValue: A.value,
      },
      attackCurve: {
        port: attackCurve,
        type: PortType.Number,
        range: [attackCurve.minValue, attackCurve.maxValue],
        defaultValue: attackCurve.value,
      },
      D: {
        port: D,
        type: PortType.Number,
        range: [D.minValue, D.maxValue],
        defaultValue: D.value,
      },
      S: {
        port: S,
        type: PortType.Number,
        range: [S.minValue, S.maxValue],
        defaultValue: S.value,
      },
      R: {
        port: R,
        type: PortType.Number,
        range: [R.minValue, R.maxValue],
        defaultValue: R.value,
      },
    },
    outputs: {
      gain: {
        port: adsr,
        type: PortType.Gate,
        range: [0, 1],
        defaultValue: 0,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(adsr.port, port);
    },
  };
};

export default adsr;
