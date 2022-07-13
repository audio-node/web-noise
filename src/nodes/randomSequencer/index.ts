import { Note, Scale } from "@tonaljs/tonal";
//@ts-ignore
import clockCounterProcessor from "worklet-loader!../clockCounter/worklet.ts"; // eslint-disable-line
//@ts-ignore
import randomSequencerWorkletProcessor from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

type NoteChangeHandler = (args: { note: string }) => void;

export interface RandomSequencer extends Node {
  constantSource: ConstantSourceNode;
  onNoteChange: (fn: NoteChangeHandler) => void;
}

const range = Scale.rangeOf("C major");
const notesRange = range("A2", "A6");

const randomSequencer = async (
  audioContext: AudioContext
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

export interface RandomSequencerWorklet extends Node {
  randomSequencer: AudioWorkletNode;
}

export const randomSequencerWorklet = async (
  audioContext: AudioContext
): Promise<RandomSequencerWorklet> => {
  await audioContext.audioWorklet.addModule(randomSequencerWorkletProcessor);
  const randomSequencer = new AudioWorkletNode(
    audioContext,
    "random-sequencer-processor",
    {
      numberOfOutputs: 2,
    }
  );

  return {
    inputs: {
      trigger: {
        port: randomSequencer,
      },
    },
    outputs: {
      out: {
        port: [randomSequencer, 0],
      },
      midi: {
        port: [randomSequencer, 1],
      },
    },
    randomSequencer,
  };
};

export default randomSequencer;
