import type { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import passThroughWorkerUrl from "worklet:./worklet.ts";

const passThroughWorker = new URL(passThroughWorkerUrl, import.meta.url);

export interface PassThrough extends WNAudioNode {}

export const passThrough = async (
  audioContext: AudioContext,
): Promise<PassThrough> => {
  await audioContext.audioWorklet.addModule(passThroughWorker);
  const passThroughNode = new AudioWorkletNode(
    audioContext,
    "pass-through-processor",
  );

  return {
    inputs: {
      in: {
        port: passThroughNode,
      },
    },
    outputs: {
      out: {
        port: passThroughNode,
      },
    },
  };
};

export default passThrough;
