import type { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export enum MathNodeParameters {
  A = "A",
  B = "B",
  C = "C",
  X = "X",
  Y = "Y",
  Z = "Z",
}

export interface MathNodeValues {
  expression?: string;
}

export interface MathNodeConfig {}

export type MathNodeData = WNNodeData<MathNodeValues, MathNodeConfig>;

export interface MathNodeProps extends WNNodeProps<MathNodeData> {}

export interface MathNode extends WNAudioNode {
  setValues: (values?: MathNodeValues) => void;
}
