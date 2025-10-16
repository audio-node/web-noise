// @ts-ignore
import { fft, util as fftUtil } from "fft-js";
import { useBroadcast } from "../../lib/useBroadcast";

const DEFAULT_FFT_SIZE = 2048;

export class SpectroscopeProcessor extends AudioWorkletProcessor {
  sampleIndex = 0;
  buffer = new Float32Array();
  isActive = true;
  fft: any;

  broadcast = useBroadcast(this.port);

  static get parameterDescriptors() {
    return [{ name: "fftSize", minValue: 0 }];
  }

  constructor() {
    super();
    this.port.start();
  }

  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const input = inputs[0][0];

    const fftSize = parameters.fftSize[0];
    const analysisWindowSize = fftSize <= 0 ? DEFAULT_FFT_SIZE : fftSize;

    if (this.buffer.length !== analysisWindowSize) {
      this.buffer = new Float32Array(analysisWindowSize);
    }

    if (!input && this.isActive) {
      this.broadcast({
        phasors: [],
        magnitudes: new Uint8Array(),
        frequencies: new Uint8Array(),
      });
      this.isActive = false;
    }
    if (input && !this.isActive) {
      this.isActive = true;
    }

    for (let i = 0; i < input?.length; i += 1) {
      this.buffer[this.sampleIndex] = input[i];
      this.sampleIndex += 1;

      if (this.sampleIndex >= analysisWindowSize) {
        const phasors: Array<[number, number]> = fft(this.buffer);
        const frequencies = new Uint8Array(
          fftUtil.fftFreq(phasors, sampleRate),
        );
        const magnitudes = new Uint8Array(fftUtil.fftMag(phasors));
        this.broadcast({ phasors, frequencies, magnitudes });
        this.sampleIndex = 0;
      }
    }

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("spectroscope-processor", SpectroscopeProcessor);
} catch (e) {}
