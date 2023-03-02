import type { FC } from "react";
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

export interface AudioNodeTypes
  extends Record<string, CreateWNAudioNode | false> {}

export type CreateWNAudioNode<T = WNAudioNode> = (
  audioContext: AudioContext,
  data?: WNNodeData,
  audioNodeTypes?: AudioNodeTypes
) => T | Promise<T>;

export interface WNNodeData<
  Values = Record<string, unknown>,
  Config = Record<string, unknown>
> {
  label: string;
  values?: Values;
  config?: Config;
}

export type WNNode = Node<WNNodeData>;
export type WNEdge = Edge;

export interface WNContainerNode {
  patch: { nodes: WNNode[]; edges: WNEdge[] };
}

export type CreateWNContainerNode = (
  node?: WNNode
) => WNContainerNode | Promise<WNContainerNode>;

export interface ControlPanelNodeProps {
  node: WNNode;
  audioNode?: WNAudioNode | null;
  updateNodeValues?: (param: any) => void;
}

export type ControlPanelNode = FC<ControlPanelNodeProps>;

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
