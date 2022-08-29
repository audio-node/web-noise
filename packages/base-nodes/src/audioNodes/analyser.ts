import { WNAudioNode } from "@web-noise/core";

export interface Analyser extends WNAudioNode {
  analyser: AnalyserNode;
}

export const analyser = (audioContext: AudioContext): Analyser => {
  const analyser = audioContext.createAnalyser();
  return {
    inputs: {
      in: {
        port: analyser,
      },
    },
    outputs: {
      out: {
        port: analyser,
      },
    },
    analyser,
  };
};
