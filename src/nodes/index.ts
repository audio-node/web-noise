import scriptNode from "./scriptNode";
import mathNode from "./math";
import randomSequencer, { randomSequencerWorklet } from "./randomSequencer";
import midiToFrequency from "./midiToFrequency";
import { stepSequencer, stepSequencerWorklet } from "./stepSequencer";

export type { ScriptNode, ScriptNodeValues } from "./scriptNode";
export type { MathNode, MathNodeValues } from "./math";
export type { StepSequencer, StepSequencerValues } from "./stepSequencer";
export type { RandomSequencer } from "./randomSequencer";

export const nodeTypes = {
  randomSequencer,
  randomSequencerWorklet,
  scriptNode,
  mathNode,
  stepSequencer,
  stepSequencerWorklet,
  midiToFrequency,
};
