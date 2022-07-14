import { Node } from "../ModuleContext";
import whiteNoise from "./whiteNoise";
import scriptNode from "./scriptNode";
import mathNode from "./math";
import reverb from "./reverb";
import oscillator from "./oscillator";
import gain from "./gain";
import filter from "./filter";
import randomSequencer, { randomSequencerWorklet } from "./randomSequencer";
import virtualKeyboard from "./virtualKeyboard";
import clock, { Clock } from "./clock";
import { analyser, analyserWorklet } from './analyser';
import stepSequencer from "./stepSequencer";
import constantSource from './constantSource';
import adsr from './adsr';

export type { WhiteNoise } from "./whiteNoise";
export type { ScriptNode } from "./scriptNode";
export type { MathNode } from "./math";
export type { Reverb } from "./reverb";
export type { ConstantSource, ConstantSourceValues } from "./constantSource";
export type { Oscillator, OscillatorValues } from "./oscillator";
export type { Gain, GainValues } from "./gain";
export type { ADSR, ADSRValues } from "./adsr";
export type { Filter, FilterValues } from "./filter";
export type {
  RandomSequencer,
  RandomSequencerWorklet,
} from "./randomSequencer";
export type { VirtualKeyboard } from "./virtualKeyboard";
export type { Clock } from "./clock";
export type { Analyser, AnalyserWorklet } from './analyser';

const clockMap = new Map<AudioContext, Promise<Clock>>();
export const getClock = async (audioContext: AudioContext): Promise<Clock> => {
  if (clockMap.has(audioContext)) {
    //@ts-expect-error very strange behaviour, typewise get() can return undefined
    return clockMap.get(audioContext);
  }
  const contextClock = clock(audioContext);
  clockMap.set(audioContext, contextClock);
  return contextClock;
};

export interface Destination extends Node {
  destination: AudioDestinationNode;
}

export const destination = (audioContext: AudioContext): Destination => {
  const destination = audioContext.destination;
  return {
    inputs: {
      in: {
        port: destination,
      },
    },
    destination,
  };
};


export const nodeTypes = {
  oscillator,
  analyser,
  analyserWorklet,
  destination,
  whiteNoise,
  reverb,
  constantSource,
  gain,
  filter,
  randomSequencer,
  randomSequencerWorklet,
  scriptNode,
  mathNode,
  virtualKeyboard,
  clock,
  stepSequencer,
  adsr,
};
