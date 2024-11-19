import { WNAudioNode } from "@web-noise/core";
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

  return {
    inputs: {
      trigger: {
        port: adsr.parameters.get(ADSRParameters.Trigger)!,
      },
      A: {
        port: adsr.parameters.get(ADSRParameters.A)!,
      },
      attackCurve: {
        port: adsr.parameters.get(ADSRParameters.AttackCurve)!,
      },
      D: {
        port: adsr.parameters.get(ADSRParameters.D)!,
      },
      S: {
        port: adsr.parameters.get(ADSRParameters.S)!,
      },
      R: {
        port: adsr.parameters.get(ADSRParameters.R)!,
      },
    },
    outputs: {
      gain: {
        port: adsr,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(adsr.port, port);
    },
  };
};

export default adsr;
