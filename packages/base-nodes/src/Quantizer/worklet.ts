const quantizeSample = (
  sample: number,
  bitDepth: number,
  maxAbsValue: number
): number => {
  const maxIntValue = Math.pow(2, bitDepth - 1) - 1;
  const scale = maxAbsValue / maxIntValue;
  const quantizedValue = Math.round(sample / scale);
  return Math.max(-maxAbsValue, Math.min(maxAbsValue, quantizedValue * scale));
};

export class QuantizerProcessor extends AudioWorkletProcessor {
  static get parameterDescriptors() {
    return [
      {
        name: "bitDepth",
      },
    ];
  }

  process(
    inputs: [Float32Array[]],
    outputs: [Float32Array[]],
    parameters: { bitDepth: Float32Array }
  ) {
    const input = inputs[0];
    const output = outputs[0];
    const bitDepth = parameters.bitDepth[0];
    const maxAbsValue = 1.0; // Output range from -1 to 1

    for (let channel = 0; channel < output.length; ++channel) {
      const inputChannel = input[channel];

      if (!inputChannel) {
        continue;
      }

      const outputChannel = output[channel];

      for (let i = 0; i < outputChannel.length; ++i) {
        const quantizedValue = quantizeSample(
          inputChannel[i] ?? 0,
          bitDepth,
          maxAbsValue
        );
        outputChannel[i] = quantizedValue;
      }
    }

    return true;
  }
}

//@ts-ignore
registerProcessor("quantizer-processor", QuantizerProcessor);
