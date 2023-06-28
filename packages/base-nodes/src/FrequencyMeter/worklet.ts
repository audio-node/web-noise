import Pitchfinder from 'pitchfinder';
import { createUseBuffer } from "../lib";

const detectPitch = Pitchfinder.DynamicWavelet({ sampleRate: sampleRate });

const BUFFER_SIZE = 1024;

export class FrequencyMeterProcessor extends AudioWorkletProcessor {
  useBuffer = createUseBuffer(BUFFER_SIZE);

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const [input] = inputs;
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

//@ts-ignore
registerProcessor("frequency-meter-processor", FrequencyMeterProcessor);
