import aubio, { Aubio, Pitch } from "aubiojs";
import { createUseBuffer } from "../../lib";
import type { PitchParams } from "./types";

const DEFAULT_FFT_SIZE = 1024;

export enum PitchMethod {
  "default" = "default",
  "yin" = "yin",
  "mcomb" = "mcomb",
  "schmitt" = "schmitt",
  "fcomb" = "fcomb",
  "yinfft" = "yinfft",
  "yinfast" = "yinfast",
  "specacf" = "specacf",
}

export const PITCH_METHODS = Object.keys(PitchMethod) as unknown as Array<
  keyof typeof PitchMethod
>;

export const DEFAULT_PARAMS: PitchParams = {
  method: 0,
  bufferSize: DEFAULT_FFT_SIZE,
  hopSize: DEFAULT_FFT_SIZE / 4,
  sampleRate: 44100,
};

type GetPitch = (slice: Float32Array) => number;

export const createUseGetPitch = () => {
  const current: Partial<PitchParams> = {};

  let Pitch: Aubio["Pitch"];
  aubio().then((instance) => {
    Pitch = instance.Pitch;
  });

  let useBuffer: ReturnType<typeof createUseBuffer>;
  let getPitch: GetPitch = () => -1;
  return ({ method, bufferSize, hopSize, sampleRate }: PitchParams) => {
    if (!Pitch) {
      return null;
    }
    const newParams: PitchParams = {
      method: method ?? 0,
      bufferSize: bufferSize <= 0 ? DEFAULT_PARAMS.bufferSize : bufferSize,
      hopSize: hopSize <= 0 ? DEFAULT_PARAMS.hopSize : hopSize,
      sampleRate,
    };
    if (newParams.bufferSize !== current.bufferSize) {
      useBuffer = createUseBuffer(newParams.bufferSize);
    }

    if (
      newParams.method !== current.method ||
      newParams.bufferSize !== current.bufferSize ||
      newParams.hopSize !== current.hopSize
    ) {
      const method = PITCH_METHODS[newParams.method];
      const pitchProcessor = new Pitch(
        method,
        newParams.bufferSize,
        newParams.hopSize,
        sampleRate,
      );
      getPitch = (slice) => {
        const buffer = useBuffer(slice);
        return pitchProcessor?.do(buffer) ?? 0;
      };
      Object.assign(current, newParams);
    }
    return getPitch;
  };
};
