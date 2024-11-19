import { WNNodeProps, WNNodeData, WNAudioNode } from "@web-noise/core";

export interface MathNodeValues {
  expression?: string;
}

export interface MathNodeConfig {}

export type MathNodeData = WNNodeData<MathNodeValues, MathNodeConfig>;

export interface MathNodeProps extends WNNodeProps<MathNodeData> {}

export interface MathNode extends WNAudioNode {
  setValues: (values?: MathNodeValues) => void;
}
