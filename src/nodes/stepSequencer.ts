import { Node } from "../ModuleContext";

export interface StepSequencer extends Node {
  gateSource: ConstantSourceNode;
  freqSource: ConstantSourceNode;
  ctrlSource: ConstantSourceNode;
}

const stepSequencer = (audioContext: AudioContext): StepSequencer => {
  const gateSource = audioContext.createConstantSource();
  const freqSource = audioContext.createConstantSource();
  const ctrlSource = audioContext.createConstantSource();

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
    gateSource,
    freqSource,
    ctrlSource,
  };
};

export default stepSequencer;
