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
  audioContext: AudioContext,
  data?: WNNodeData
) => WNAudioNode | Promise<WNAudioNode>;

export interface WNNodeData {
  label: string;
  values?: Record<string, unknown>;
  config?: Record<string, unknown>;
}

export type WNNode = Node<WNNodeData>;
export type WNEdge = Edge;

export interface WNContainerNode {
  patch: { nodes: WNNode[]; edges: WNEdge[] };
}

export type CreateWNContainerNode = (
  node?: WNNode
) => WNContainerNode | Promise<WNContainerNode>;

export interface PluginComponent {
  id?: string;
  type: string;
  node: any;
  audioNode: CreateWNAudioNode | false;
  containerNode?: CreateWNContainerNode;
  controlPanelNode?: any;
  description?: string;
  name?: string;
}

export interface PluginConfig {
  components: Array<PluginComponent>;
  name?: string;
  description?: string;
}
