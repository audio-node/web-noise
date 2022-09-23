import { Node, Edge } from "react-flow-renderer";

export type AudioNodeChannel = [AudioNode, number];

export interface InputPort {
  port: AudioNode | AudioNodeChannel | AudioParam;
}

export interface OutputPort {
  port: AudioNode | AudioNodeChannel;
}

export interface WNAudioNode extends Record<string, any> {
  inputs?: Record<string, InputPort | never>;
  outputs?: Record<string, OutputPort | never>;
  destroy?: () => void;
  setValues?: (values?: any) => void;
}

export type CreateWNAudioNode = (
  audioContext: AudioContext
) => WNAudioNode | Promise<WNAudioNode>;

export interface WNNodeData {
  label: string;
  values?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export type WNNode = Node<WNNodeData>;
export type WNEdge = Edge;
