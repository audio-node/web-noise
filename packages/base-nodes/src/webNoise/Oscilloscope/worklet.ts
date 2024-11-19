import { useBroadcast } from "../../lib/useBroadcast";

const DEFAULT_FFT_SIZE = 1024;

export class AnalyserProcessor extends AudioWorkletProcessor {
  buffers: Array<Float32Array>;
  isActive: Array<boolean>;
  sampleIndex = 0;
  currentFftSize?: number;

  broadcast = useBroadcast(this.port);

  static get parameterDescriptors() {
    return [{ name: "fftSize" }];
  }

  constructor({ numberOfInputs }: { numberOfInputs: number }) {
    super();
    this.buffers = Array.from(
      { length: numberOfInputs },
      () => new Float32Array(),
    );
    this.isActive = this.buffers.map(() => true);
    this.port.start();
  }

  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: { fftSize: Float32Array },
  ) {
    const inputsData = this.buffers.map((_, index) => inputs[index][0]);

    const fftSize = parameters.fftSize[0];
    const analysisWindowSize = fftSize <= 0 ? DEFAULT_FFT_SIZE : fftSize;

    if (this.currentFftSize !== analysisWindowSize) {
      this.buffers = this.buffers.map(
        () => new Float32Array(analysisWindowSize),
      );
      this.currentFftSize = analysisWindowSize;
    }

    for (let index = 0; index < inputsData.length; index++) {
      const inputData = inputsData[index];
      if (!inputData && this.isActive[index]) {
        this.broadcast(new Float32Array(), index);
        this.isActive[index] = false;
      }
      if (inputData && !this.isActive[index]) {
        this.isActive[index] = true;
      }
    }

    const samplesCount = inputsData.reduce(
      (acc, inputData) => inputData?.length ?? acc,
      0,
    );

    for (let i = 0; i < samplesCount; i += 1) {
      if (this.sampleIndex >= analysisWindowSize) {
        for (let index = 0; index < this.buffers.length; index++) {
          this.broadcast(this.buffers[index], index);
        }
        this.sampleIndex = 0;
      }

      for (let index = 0; index < this.buffers.length; index++) {
        this.buffers[index][this.sampleIndex] = inputsData[index]?.[i];
      }
      this.sampleIndex += 1;
    }

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("oscilloscope-processor", AnalyserProcessor);
} catch (e) {}
