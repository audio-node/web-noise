import { Midi } from "@tonaljs/tonal";
import { WNAudioNode } from "@web-noise/core";

export interface VirtualKeyboard extends WNAudioNode {
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

  const trigger = audioContext.createConstantSource();
  trigger.start();

  let currentNote: number;

  return {
    outputs: {
      gate: {
        port: gate,
      },
      trigger: {
        port: trigger,
      },
      frequency: {
        port: frequency,
      },
      midi: {
        port: midi,
      },
    },
    midi,
    gate,
    frequency,
    play(note) {
      currentNote = note;
      const frequencyValue = Midi.midiToFreq(note);

      frequency.offset.setValueAtTime(frequencyValue, audioContext.currentTime);
      midi.offset.setValueAtTime(note, audioContext.currentTime);
      gate.offset.setValueAtTime(1, audioContext.currentTime);

      trigger.offset.setValueAtTime(1, audioContext.currentTime);
      trigger.offset.setValueAtTime(0, audioContext.currentTime + 1 / 100000);
    },
    stop(note) {
      if (note === currentNote) {
        gate.offset.setValueAtTime(0, audioContext.currentTime);
      }
    },
  };
};

export default virtualKeyboard;
