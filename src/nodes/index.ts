import scriptNode from "./scriptNode";
import mathNode from "./math";
import midiToFrequency from "./midiToFrequency";

export type { ScriptNode, ScriptNodeValues } from "./scriptNode";
export type { MathNode, MathNodeValues } from "./math";

export const nodeTypes = {
  scriptNode,
  mathNode,
  midiToFrequency,
};
