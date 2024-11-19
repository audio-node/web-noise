import { useBroadcast } from "../../lib/useBroadcast";

export class ValueMeterProcessor extends AudioWorkletProcessor {
  sampleIndex = 0;
  buffer = new Float32Array();
  isActive = true;

  broadcast = useBroadcast(this.port);

  constructor() {
    super();
    this.port.start();
  }

  process(inputs: Float32Array[][]) {
    const input = inputs[0][0];

    const analysisWindowSize = 1024;

    if (this.buffer.length !== analysisWindowSize) {
      this.buffer = new Float32Array(analysisWindowSize);
    }

    const analysis_samples = this.buffer;

    if (!input && this.isActive) {
      this.broadcast(new Float32Array());
      this.isActive = false;
    }
    if (input && !this.isActive) {
      this.isActive = true;
    }

    for (let i = 0; i < input?.length; i += 1) {
      analysis_samples[this.sampleIndex] = input[i];
      this.sampleIndex += 1;

      if (this.sampleIndex === analysisWindowSize) {
        this.broadcast(analysis_samples);
        this.sampleIndex = 0;
      }
    }

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("value-meter-processor", ValueMeterProcessor);
} catch (e) {}
