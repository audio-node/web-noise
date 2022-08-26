//@ts-ignore
import analyserWorkletUrl from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { WNAudioNode } from "@web-noise/core";

export interface AnalyserWorklet extends WNAudioNode {
  input1Analyser: AudioWorkletNode;
  input2Analyser: AudioWorkletNode;
}

export const analyserWorklet = async (audioContext: AudioContext): Promise<AnalyserWorklet> => {
  await audioContext.audioWorklet.addModule(analyserWorkletUrl);
  const input1Analyser = new AudioWorkletNode(
    audioContext,
    "analyser-processor"
  );
  const input2Analyser = new AudioWorkletNode(
    audioContext,
    "analyser-processor"
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
