import scriptNode from "./scriptNode";
import mathNode from "./math";
import randomSequencer, { randomSequencerWorklet } from "./randomSequencer";
import virtualKeyboard from "./virtualKeyboard";
import { analyserWorklet } from "./analyser";
import midiToFrequency from "./midiToFrequency";
import { stepSequencer, stepSequencerWorklet } from "./stepSequencer";

export type { ScriptNode, ScriptNodeValues } from "./scriptNode";
export type { MathNode, MathNodeValues } from "./math";
export type { StepSequencer, StepSequencerValues } from "./stepSequencer";
export type { RandomSequencer } from "./randomSequencer";
export type { VirtualKeyboard } from "./virtualKeyboard";
export type { AnalyserWorklet } from "./analyser";

export const nodeTypes = {
  analyserWorklet,
  randomSequencer,
  randomSequencerWorklet,
  scriptNode,
  mathNode,
  virtualKeyboard,
  stepSequencer,
  stepSequencerWorklet,
  midiToFrequency,
};
