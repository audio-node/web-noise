import { FrequencyMeterParameters } from "./types";
import { createUseGetPitch, PITCH_METHODS } from "./useGetPitch";

type Parameters = { [key in FrequencyMeterParameters]: Float32Array };

type Port = Float32Array[];

export class FrequencyMeterProcessor extends AudioWorkletProcessor {
  useGetPitch = createUseGetPitch();

  static get parameterDescriptors() {
    return [
      {
        name: FrequencyMeterParameters.Method,
        minValue: 0,
        maxValue: PITCH_METHODS.length - 1,
      },
      {
        name: FrequencyMeterParameters.FFTSize,
      },
      {
        name: FrequencyMeterParameters.HopSize,
      },
    ];
  }

  process(inputs: [Port], outputs: [Port], parameters: Parameters) {
    const [input] = inputs;

    if (!input || !input.length) {
      return true;
    }

    const getPitch = this.useGetPitch({
      method: parameters[FrequencyMeterParameters.Method][0],
      bufferSize: parameters[FrequencyMeterParameters.FFTSize][0],
      hopSize: parameters[FrequencyMeterParameters.HopSize][0],
      sampleRate,
    });

    if (!getPitch) {
      return true;
    }

    const frequency = getPitch(input[0]);

    outputs[0].forEach((channel) => {
      for (let index in channel) {
        channel[index] = frequency;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("frequency-meter-processor", FrequencyMeterProcessor);
} catch (e) {}
