import { WNAudioNode } from "@web-noise/core";

const analyserWorkletUrl = new URL('./worklet.ts', import.meta.url);

export type AnalyserEventHandler = (event: { data: Float32Array }) => void

export interface Oscolloscope extends WNAudioNode {
  input1Analyser: AudioWorkletNode;
  input2Analyser: AudioWorkletNode;
}

export const oscilloscope = async (audioContext: AudioContext): Promise<Oscolloscope> => {
  await audioContext.audioWorklet.addModule(analyserWorkletUrl);
  const input1Analyser = new AudioWorkletNode(
    audioContext,
    "oscilloscope-processor"
  );
  const input2Analyser = new AudioWorkletNode(
    audioContext,
    "oscilloscope-processor"
  );

  return {
    inputs: {
      input1: {
        port: input1Analyser,
      },
      input2: {
        port: input2Analyser,
      },
    },
    input1Analyser,
    input2Analyser,
  };
};
