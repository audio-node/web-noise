import whiteNoise from "./whiteNoise";
import scriptNode from "./scriptNode";
import mathNode from "./math";
import reverb from "./reverb";
import randomSequencer, { randomSequencerWorklet } from "./randomSequencer";
import virtualKeyboard from "./virtualKeyboard";
import clock, { Clock } from "./clock";
import { analyserWorklet } from "./analyser";
import midiToFrequency from "./midiToFrequency";
import { stepSequencer, stepSequencerWorklet } from "./stepSequencer";
import adsr from "./adsr";

export type { WhiteNoise } from "./whiteNoise";
export type { ScriptNode, ScriptNodeValues } from "./scriptNode";
export type { MathNode, MathNodeValues } from "./math";
export type { Reverb } from "./reverb";
export type { ADSR, ADSRValues } from "./adsr";
export type { StepSequencer, StepSequencerValues } from "./stepSequencer";
export type { RandomSequencer } from "./randomSequencer";
export type { VirtualKeyboard } from "./virtualKeyboard";
export type { Clock } from "./clock";
export type { AnalyserWorklet } from "./analyser";

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

export const nodeTypes = {
  analyserWorklet,
  whiteNoise,
  reverb,
  randomSequencer,
  randomSequencerWorklet,
  scriptNode,
  mathNode,
  virtualKeyboard,
  clock,
  stepSequencer,
  stepSequencerWorklet,
  adsr,
  midiToFrequency,
};
