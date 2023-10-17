export class PassThroughProcessor extends AudioWorkletProcessor {
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    _parameters: Record<string, Float32Array>,
  ) {
    try {
      inputs[0].forEach((channel, index) => outputs[0][index].set(channel));
    } catch (e) {
      console.error(e);
    }

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("pass-through-processor", PassThroughProcessor);
} catch (e) {}
