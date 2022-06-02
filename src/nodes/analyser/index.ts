//@ts-ignore
import analyserWorkletUrl from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface Analyser extends Node {
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

export interface AnalyserWorklet extends Node {
  analyser: AudioWorkletNode;
}

export const analyserWorklet = async (audioContext: AudioContext): Promise<AnalyserWorklet> => {
  await audioContext.audioWorklet.addModule(analyserWorkletUrl);
  const analyser = new AudioWorkletNode(
    audioContext,
    "analyser-processor"
  );

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

export default analyser;
