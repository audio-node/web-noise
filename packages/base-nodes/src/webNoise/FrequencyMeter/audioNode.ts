import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { FrequencyMeterParameters } from "./types";

//@ts-ignore
import workletUrl from "worklet:./worklet.ts";

const worklet = new URL(workletUrl, import.meta.url);

const frequencyMeter = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(worklet);
  const frequencyMeter = new AudioWorkletNode(
    audioContext,
    "frequency-meter-processor",
  );

  const method = frequencyMeter.parameters.get(
    FrequencyMeterParameters.Method,
  )!;
  const fftSize = frequencyMeter.parameters.get(
    FrequencyMeterParameters.FFTSize,
  )!;
  const hopSize = frequencyMeter.parameters.get(
    FrequencyMeterParameters.HopSize,
  )!;

  return {
    inputs: {
      input: {
        port: frequencyMeter,
        type: PortType.Audio,
      },
      method: {
        port: method,
        type: PortType.Number,
        range: [method.minValue, method.maxValue],
        defaultValue: method.defaultValue,
      },
      fftSize: {
        port: fftSize,
        type: PortType.Number,
        range: [fftSize.minValue, fftSize.maxValue],
        defaultValue: fftSize.defaultValue,
      },
      hopSize: {
        port: hopSize,
        type: PortType.Number,
        range: [hopSize.minValue, hopSize.maxValue],
        defaultValue: hopSize.defaultValue,
      },
    },
    outputs: {
      frequency: {
        port: frequencyMeter,
        type: PortType.Number,
      },
    },
  };
};

export default frequencyMeter;
