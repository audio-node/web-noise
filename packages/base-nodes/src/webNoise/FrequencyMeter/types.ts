export interface PitchParams {
  method: number;
  bufferSize: number;
  hopSize: number;
  sampleRate: number;
}

export enum FrequencyMeterParameters {
  Method = "method",
  FFTSize = "fftSize",
  HopSize = "hopSize",
}
