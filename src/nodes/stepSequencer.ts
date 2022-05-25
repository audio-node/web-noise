import { Node } from "../ModuleContext";
import { Midi } from "@tonaljs/tonal";

interface StepSequencerValues {
  midi: number;
}

export interface StepSequencer extends Node {
  // gateSource: ConstantSourceNode; //TODO: to implement
  freqSource: ConstantSourceNode;
  ctrlSource: ConstantSourceNode;
  setValues: (values: StepSequencerValues) => void;
}

const stepSequencer = (audioContext: AudioContext): StepSequencer => {
  const freqSource = audioContext.createConstantSource();
  const ctrlSource = audioContext.createConstantSource();

  freqSource.start();
  ctrlSource.start();

  return {
    outputs: {
      freq: {
        port: freqSource,
      },
      ctrl: {
        port: ctrlSource,
      },
    },
    destroy: () => {
      freqSource.stop();
      ctrlSource.stop();
    },
    setValues: ({ midi }) => {
      freqSource.offset.value = Midi.midiToFreq(midi);
      ctrlSource.offset.value = midi;
    },
    freqSource,
    ctrlSource,
  };
};

export default stepSequencer;
