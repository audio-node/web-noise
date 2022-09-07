export class AnalyserProcessor extends AudioWorkletProcessor {
  sampleIndex = 0;
  buffer = new Float32Array();
  isActive = true;

  static get parameterDescriptors() {
    return [{ name: "analysisWindowSize", defaultValue: 1024, minValue: 128 }];
  }

  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: Record<string, Array<any>>
  ) {
    const input = inputs[0][0];

    const analysisWindowSize = parameters.analysisWindowSize[0];

    if (this.buffer.length !== analysisWindowSize) {
      this.buffer = new Float32Array(analysisWindowSize);
    }

    const analysis_samples = this.buffer;

    if (!input && this.isActive) {
      this.port.postMessage(new Float32Array());
      this.isActive = false;
    }
    if (input && !this.isActive) {
      this.isActive = true;
    }

    for (let i = 0; i < input?.length; i += 1) {
      analysis_samples[this.sampleIndex] = input[i];
      this.sampleIndex += 1;

      if (this.sampleIndex === analysisWindowSize) {
        this.port.postMessage(analysis_samples);
        this.sampleIndex = 0;
      }
    }

    return true;
  }
}

//@ts-ignore
registerProcessor("oscilloscope-processor", AnalyserProcessor);
