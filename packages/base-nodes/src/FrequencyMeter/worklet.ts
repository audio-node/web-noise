import Pitchfinder from "pitchfinder";
import { createUseBuffer } from "../lib";

const detectPitch = Pitchfinder.DynamicWavelet({ sampleRate: sampleRate });

const DEFAULT_FFT_SIZE = 1024;

export class FrequencyMeterProcessor extends AudioWorkletProcessor {
  useBuffer = createUseBuffer(DEFAULT_FFT_SIZE);
  currentFftSize = DEFAULT_FFT_SIZE;

  static get parameterDescriptors() {
    return [{ name: "fftSize" }];
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: {
      fftSize: Float32Array;
    },
  ) {
    const [input] = inputs;

    const fftSize = parameters.fftSize[0];
    const analysisWindowSize = fftSize <= 0 ? DEFAULT_FFT_SIZE : fftSize;

    if (this.currentFftSize !== analysisWindowSize) {
      this.useBuffer = createUseBuffer(analysisWindowSize);
      this.currentFftSize = analysisWindowSize;
    }

    if (!input || !input.length) {
      return true;
    }

    const buffer = this.useBuffer(input[0]);
    const frequency = detectPitch(buffer);

    outputs[0].forEach((channel) => {
      for (let index in channel) {
        channel[index] = frequency || 0;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("frequency-meter-processor", FrequencyMeterProcessor);
} catch (e) {}
