import { Scale, Note, Midi } from "@tonaljs/tonal";
import { Node } from "../../ModuleContext";

export interface MidiSynth extends Node {
  gate: ConstantSourceNode;
  frequency: ConstantSourceNode;
  play: (note: number) => void;
  stop: (note: number) => void;
}

const midiSynth = (audioContext: AudioContext): MidiSynth => {
  const gate = audioContext.createConstantSource();
  gate.offset.value = 0;
  gate.start();

  const frequency = audioContext.createConstantSource();
  frequency.start();

  let currentNote: number;

  return {
    outputs: {
      gate: {
        port: gate,
      },
      frequency: {
        port: frequency
      }
    },
    gate,
    frequency,
    play(note) {
      currentNote = note;
      const frequencyValue = Midi.midiToFreq(note);

      frequency.offset.setValueAtTime(frequencyValue, audioContext.currentTime);
      gate.offset.setValueAtTime(1, audioContext.currentTime)

      //oscillator.frequency.setValueAtTime(frequencyValue, audioContext.currentTime);

      /*gain.gain.cancelScheduledValues(audioContext.currentTime);
      gain.gain.setValueAtTime(0, audioContext.currentTime);

      gain.gain.linearRampToValueAtTime(
        1,
        audioContext.currentTime + controls.attack
      );
      gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + controls.decay + controls.sustain
      );*/
    },
    stop(note) {
      if (note === currentNote) {
        frequency.offset.setValueAtTime(0, audioContext.currentTime);
        gate.offset.setValueAtTime(0, audioContext.currentTime)
      }

      //oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
      //const oscillator = oscillators[note];
      //oscillator.stop(audioContext.currentTime);
      //oscillator.disconnect(gain);
      //delete oscillators[note];
      // console.log(9090, note);
    },
  };
};

export default midiSynth;
