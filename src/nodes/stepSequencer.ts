import { Node } from "../ModuleContext";
import { Midi } from "@tonaljs/tonal";

interface StepSequencerValues {
  midi: number;
}

export interface StepSequencer extends Node {
  gateSource: ConstantSourceNode;
  freqSource: ConstantSourceNode;
  ctrlSource: ConstantSourceNode;
  setValues: (values: StepSequencerValues) => void;
}

const stepSequencer = (audioContext: AudioContext): StepSequencer => {
  const gateSource = audioContext.createConstantSource();
  const freqSource = audioContext.createConstantSource();
  const ctrlSource = audioContext.createConstantSource();

  gateSource.start();
  freqSource.start();
  ctrlSource.start();

  return {
    outputs: {
      gate: {
        port: gateSource,
      },
      freq: {
        port: freqSource,
      },
      ctrl: {
        port: ctrlSource,
      },
    },
    destroy: () => {
      gateSource.stop();
      freqSource.stop();
      ctrlSource.stop();
    },
    setValues: ({ midi }) => {
      freqSource.offset.value = Midi.midiToFreq(midi);
      ctrlSource.offset.value = midi;
    },
    gateSource,
    freqSource,
    ctrlSource,
  };
};

export default stepSequencer;
