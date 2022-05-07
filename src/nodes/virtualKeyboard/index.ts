import { Midi } from "@tonaljs/tonal";
import { Node } from "../../ModuleContext";

export interface VirtualKeyboard extends Node {
  gate: ConstantSourceNode;
  frequency: ConstantSourceNode;
  midi: ConstantSourceNode;
  play: (note: number) => void;
  stop: (note: number) => void;
}

const virtualKeyboard = (audioContext: AudioContext): VirtualKeyboard => {
  const gate = audioContext.createConstantSource();
  gate.offset.value = 0;
  gate.start();

  const frequency = audioContext.createConstantSource();
  frequency.start();

  const midi = audioContext.createConstantSource();
  midi.start();

  let currentNote: number;

  return {
    outputs: {
      gate: {
        port: gate,
      },
      frequency: {
        port: frequency
      },
      midi: {
        port: midi
      }
    },
    midi,
    gate,
    frequency,
    play(note) {
      currentNote = note;
      const frequencyValue = Midi.midiToFreq(note);

      frequency.offset.setValueAtTime(frequencyValue, audioContext.currentTime);
      midi.offset.setValueAtTime(note, audioContext.currentTime);
      gate.offset.setValueAtTime(1, audioContext.currentTime)
    },
    stop(note) {
      if (note === currentNote) {
        frequency.offset.setValueAtTime(0, audioContext.currentTime);
        gate.offset.setValueAtTime(0, audioContext.currentTime);
        midi.offset.setValueAtTime(0, audioContext.currentTime);
      }
    },
  };
};

export default virtualKeyboard;
