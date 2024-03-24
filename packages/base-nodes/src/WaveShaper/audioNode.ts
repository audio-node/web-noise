import { WNAudioNode } from "@web-noise/core";

import { WaveShaperValues, WaveShaperData } from "./types";
import {
  generateWave,
  type Points,
  type SplineType,
} from "../lib/generateWave";

export interface WaveShaper extends WNAudioNode {
  setValues: (values?: WaveShaperValues) => void;
}

export const waveShaper = async (
  audioContext: AudioContext,
  data?: WaveShaperData,
): Promise<WaveShaper> => {
  const waveShaper = audioContext.createWaveShaper();

  const updateCurve = (points?: Points, splineType?: SplineType) => {
    const audioData = generateWave(points, splineType);
    waveShaper.curve = audioData;
  };

  if (data?.values?.points) {
    updateCurve(data.values.points);
  }

  return {
    inputs: {
      input: {
        port: waveShaper,
      },
    },
    outputs: {
      output: {
        port: waveShaper,
      },
    },
    setValues: ({ points, splineType, oversample } = {}) => {
      updateCurve(points, splineType);
      if (typeof oversample !== "undefined") {
        waveShaper.oversample = oversample;
      }
    },
  };
};

export default waveShaper;
