import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import randomSequencerWorkletProcessorUrl from "worklet:./worklet.ts";

const randomSequencerWorkletProcessor = new URL(
  randomSequencerWorkletProcessorUrl,
  import.meta.url,
);

type NoteChangeHandler = (args: { note: string }) => void;

export interface RandomSequencer extends WNAudioNode {
  onNoteChange: (fn: NoteChangeHandler) => void;
}

export const randomSequencerWorklet = async (
  audioContext: AudioContext,
): Promise<RandomSequencer> => {
  await audioContext.audioWorklet.addModule(randomSequencerWorkletProcessor);
  const randomSequencer = new AudioWorkletNode(
    audioContext,
    "random-sequencer-processor",
  );

  let noteChangeHandler: NoteChangeHandler = () => {};

  randomSequencer.port.onmessage = ({
    data: { name, note },
  }: MessageEvent<{ name: string; note?: string }>) => {
    if (name === "noteChange" && note) {
      noteChangeHandler({ note });
    }
  };

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
    onNoteChange: (fn) => (noteChangeHandler = fn),
  };
};
