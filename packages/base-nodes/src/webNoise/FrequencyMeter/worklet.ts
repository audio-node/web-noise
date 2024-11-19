import { PitchWorkletParameters } from "./types";
import { createUseGetPitch, PITCH_METHODS } from "./useGetPitch";

type Parameters = { [key in PitchWorkletParameters]: Float32Array };

type Port = Float32Array[];

export class FrequencyMeterProcessor extends AudioWorkletProcessor {
  useGetPitch = createUseGetPitch();

  static get parameterDescriptors() {
    return [
      {
        name: PitchWorkletParameters.method,
        minValue: 0,
        maxValue: PITCH_METHODS.length - 1,
      },
      { name: PitchWorkletParameters.fftSize },
      { name: PitchWorkletParameters.hopSize },
    ];
  }

  process(inputs: [Port], outputs: [Port], parameters: Parameters) {
    const [input] = inputs;

    if (!input || !input.length) {
      return true;
    }

    const getPitch = this.useGetPitch({
      method: parameters[PitchWorkletParameters.method][0],
      bufferSize: parameters[PitchWorkletParameters.fftSize][0],
      hopSize: parameters[PitchWorkletParameters.hopSize][0],
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
