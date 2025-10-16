import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { ClockParameters } from "./types";

//@ts-ignore
import clockWorkletUrl from "worklet:./worklet.ts";

const clockWorklet = new URL(clockWorkletUrl, import.meta.url);

export interface Clock extends WNAudioNode {}

const clock = async (audioContext: AudioContext): Promise<Clock> => {
  await audioContext.audioWorklet.addModule(clockWorklet);
  const clock = new AudioWorkletNode(audioContext, "clock-processor", {
    numberOfOutputs: 1,
  });

  const bpm = clock.parameters.get(ClockParameters.BPM)!;
  const duty = clock.parameters.get(ClockParameters.Duty)!;

  return {
    inputs: {
      bpm: {
        port: bpm,
        type: PortType.Number,
        range: [bpm.minValue, bpm.maxValue],
        defaultValue: bpm.defaultValue,
      },
      duty: {
        port: duty,
        type: PortType.Number,
        range: [duty.minValue, duty.maxValue],
        defaultValue: duty.defaultValue,
      },
    },
    outputs: {
      trigger: {
        port: [clock, 0],
        type: PortType.Gate,
      },
    },
  };
};

export default clock;
