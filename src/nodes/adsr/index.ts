//@ts-ignore
import adsrWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { WNAudioNode } from "@web-noise/core";
import { setParameterValue } from "../helpers";

export interface ADSRValues {
  attack: number;
  attackCurve: number;
  decay: number;
  sustain: number;
  release: number;
}

export interface ADSR extends WNAudioNode {
  adsr: AudioWorkletNode;
  setValues: (values?: Partial<ADSRValues>) => void;
}

const adsr = async (audioContext: AudioContext): Promise<ADSR> => {
  await audioContext.audioWorklet.addModule(adsrWorklet);
  const adsr = new AudioWorkletNode(audioContext, "adsr-processor");

  const trigger = adsr.parameters.get("trigger")!;

  const attackParam = adsr.parameters.get("attack")!;
  const attackCurveParam = adsr.parameters.get("attackCurve")!;
  const decayParam = adsr.parameters.get("decay")!;
  const sustainParam = adsr.parameters.get("sustain")!;
  const releaseParam = adsr.parameters.get("release")!;

  return {
    inputs: {
      trigger: {
        port: trigger,
      },
    },
    outputs: {
      gain: {
        port: adsr,
      },
    },
    setValues: ({ attack, attackCurve, decay, sustain, release } = {}) => {
      setParameterValue(attackParam, attack, audioContext);
      setParameterValue(attackCurveParam, attackCurve, audioContext);
      setParameterValue(decayParam, decay, audioContext);
      setParameterValue(sustainParam, sustain, audioContext);
      setParameterValue(releaseParam, release, audioContext);
    },
    adsr,
  };
};

export default adsr;
