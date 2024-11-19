export interface PitchParams {
  method: number;
  bufferSize: number;
  hopSize: number;
  sampleRate: number;
}

export enum PitchWorkletParameters {
  method = 'method',
  fftSize = 'fftSize',
  hopSize = 'hopSize',
}
