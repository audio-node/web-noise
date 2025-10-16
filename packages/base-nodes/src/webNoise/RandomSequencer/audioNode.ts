//@ts-ignore
import randomSequencerWorkletProcessorUrl from "worklet:./worklet.ts";
import { RandomSequencer } from "./types";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { PortType } from "@web-noise/core/constants";

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
        type: PortType.Gate,
        range: [0, 1],
        defaultValue: 0,
      },
    },
    outputs: {
      midi: {
        port: randomSequencer,
        type: PortType.Number,
        range: [45, 93],
      },
    },
    registerPort: (port) => {
      addBroadcastListener(randomSequencer.port, port);
      return randomSequencer.port;
    },
  };
};
