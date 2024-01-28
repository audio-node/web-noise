export class PassThroughProcessor extends AudioWorkletProcessor {
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    _parameters: Record<string, Float32Array>,
  ) {
    const output = outputs[0];
    const input = inputs[0];
    output.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = input[channelIndex]?.[sampleIndex] ?? 0;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("pass-through-processor", PassThroughProcessor);
} catch (e) {}
