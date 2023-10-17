import Note from "@tonaljs/note";
import Scale from "@tonaljs/scale";
import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import clockCounterProcessorUrl from "worklet:../clockCounter/worklet.ts";

const clockCounterProcessor = new URL(
  clockCounterProcessorUrl,
  import.meta.url,
);

type NoteChangeHandler = (args: { note: string }) => void;

export interface RandomSequencer extends WNAudioNode {
  onNoteChange: (fn: NoteChangeHandler) => void;
}

const range = Scale.rangeOf("C major");
const notesRange = range("A2", "A6");

export const randomSequencer = async (
  audioContext: AudioContext,
): Promise<RandomSequencer> => {
  await audioContext.audioWorklet.addModule(clockCounterProcessor);
  const clock = new AudioWorkletNode(audioContext, "clock-counter-processor");

  const frequency = audioContext.createConstantSource();
  const midi = audioContext.createConstantSource();

  frequency.start();
  midi.start();

  let noteChangeHandler: NoteChangeHandler = () => {};

  clock.port.onmessage = ({ data }: MessageEvent) => {
    if (data.name === "tick") {
      const randomIndex = Math.floor(Math.random() * notesRange.length);
      const note = notesRange[randomIndex] || "C2";

      const randomFreq = Note.freq(note);
      if (randomFreq) {
        frequency.offset.value = randomFreq;
      }

      const randomMidi = Note.midi(note);
      if (randomMidi) {
        midi.offset.value = randomMidi;
      }

      noteChangeHandler({ note });
    }
  };

  return {
    inputs: {
      trigger: {
        port: clock,
      },
    },
    outputs: {
      out: {
        port: frequency,
      },
      midi: {
        port: midi,
      },
    },
    onNoteChange: (fn) => (noteChangeHandler = fn),
    destroy: () => {
      frequency.stop();
      midi.stop();
    },
    constantSource: frequency,
  };
};

