//@ts-ignore
import randomSequencerWorkletProcessorUrl from "worklet:./worklet.ts";
import { RandomSequencer } from "./types";
import { addBroadcastListener } from "../../lib/useBroadcast";

const randomSequencerWorkletProcessor = new URL(
  randomSequencerWorkletProcessorUrl,
  import.meta.url,
);

export default async (audioContext: AudioContext): Promise<RandomSequencer> => {
  await audioContext.audioWorklet.addModule(randomSequencerWorkletProcessor);
  const randomSequencer = new AudioWorkletNode(
    audioContext,
    "random-sequencer-processor",
  );

  return {
    inputs: {
      trigger: {
        port: randomSequencer,
      },
    },
    outputs: {
      midi: {
        port: randomSequencer,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(randomSequencer.port, port);
      return randomSequencer.port;
    },
  };
};
