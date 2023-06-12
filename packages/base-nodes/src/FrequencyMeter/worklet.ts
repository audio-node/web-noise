import { createUseBuffer } from "../lib";
import getFrequency from "./getFrequency";

const BUFFER_SIZE = 1024;

export class FrequencyMeterProcessor extends AudioWorkletProcessor {
  useBuffer = createUseBuffer(BUFFER_SIZE);

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const [input] = inputs;
    if (!input || !input.length) {
      return true;
    }

    const buffer = this.useBuffer(input[0]);
    const frequency = getFrequency(buffer, sampleRate);

    outputs[0].forEach((channel) => {
      for (let index in channel) {
        channel[index] = frequency;
      }
    });

    return true;
  }
}

//@ts-ignore
registerProcessor("frequency-meter-processor", FrequencyMeterProcessor);
