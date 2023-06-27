import type { FC, ReactNode } from "react";
import { Node, Edge } from "reactflow";
import { WNNodeProps } from "./components/Node";

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
  data?: WNNodeData
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

export interface GraphState {
  nodes: WNNode[];
  edges: WNEdge[];
}

export type CreateWNContainerNode = (
  node: WNNode
) => GraphState | Promise<GraphState | void> | void;

export interface ControlPanelNodeProps {
  node: WNNode;
  audioNode?: WNAudioNode | null;
  updateNodeValues?: (param: any) => void;
}

// export type ControlPanelNode = (props: ControlPanelNodeProps) => any;
export type ControlPanelNode = any;
export type ConfigNode = (props: WNNodeProps<WNNodeData>) => any;

export interface PluginComponent {
  id?: string;
  type: string;
  node: any;
  audioNode: CreateWNAudioNode | false;
  containerNode?: CreateWNContainerNode;
  controlPanelNode?: ControlPanelNode;
  configNode?: ConfigNode;
  defaultConfig?: any;
  description?: string;
  name?: string;
}

export interface PluginConfig {
  id?: string;
  components: Array<PluginComponent>;
  name?: string;
  description?: string;
}
