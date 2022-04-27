import { Scale, Note, Midi } from "@tonaljs/tonal";
import { Node } from "../../ModuleContext";

export interface MidiSynth extends Node {
  gain: GainNode;
  frequency: ConstantSourceNode;
  play: (note: number) => void;
  stop: (note: number) => void;
}

const midiSynth = (audioContext: AudioContext): MidiSynth => {
  const gain = audioContext.createGain();
  gain.gain.value = 0.5;

  const frequency = audioContext.createConstantSource();
  frequency.start();

  //const oscillator = audioContext.createOscillator();
  //oscillator.start();

  let oscillators: Record<number, OscillatorNode> = {};

  const controls = {
    attack: 0.1,
    decay: 0.1,
    sustain: 1,
    release: 0.1
  };

  return {
    outputs: {
      out: {
        port: gain,
      },
      frequency: {
        port: frequency
      }
    },
    gain,
    frequency,
    play(note) {
      const frequencyValue = Midi.midiToFreq(note);

      frequency.offset.setValueAtTime(frequencyValue, audioContext.currentTime);

      const oscillator = audioContext.createOscillator();
      oscillators[note] = oscillator;
      oscillator.frequency.value = frequencyValue;
      oscillator.connect(gain);
      oscillator.start(audioContext.currentTime);

      gain.gain.cancelScheduledValues(audioContext.currentTime);
      gain.gain.setValueAtTime(0, audioContext.currentTime);

      gain.gain.linearRampToValueAtTime(
        1,
        audioContext.currentTime + controls.attack
      );
      gain.gain.linearRampToValueAtTime(
        0,
        audioContext.currentTime + controls.decay + controls.sustain
      );
    },
    stop(note) {
      frequency.offset.setValueAtTime(0, audioContext.currentTime);

      const oscillator = oscillators[note];
      oscillator.stop(audioContext.currentTime);
      oscillator.disconnect(gain);
      delete oscillators[note];
      // console.log(9090, note);
    },
  };
};

export default midiSynth;
