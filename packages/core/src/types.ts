import { Edge, Node, Viewport } from "reactflow";
import { WNNodeProps } from "./components/Node";

export enum PortType {
  Gate = "gate",
  Number = "number",
  Audio = "audio",
  Any = "any",
}

export type AudioNodeChannel = [AudioNode, number];

export interface AudioPort {
  aliases?: string[];
  type?: PortType | PortType[];
  range?: [number, number];
  defaultValue?: number;
  mono?: boolean;
}

export interface InputPort extends AudioPort {
  port: AudioNode | AudioNodeChannel | AudioParam;
}

export interface OutputPort extends AudioPort {
  port: AudioNode | AudioNodeChannel;
}

export interface WNAudioNode extends Record<string, any> {
  inputs?: Record<string, InputPort | never>;
  outputs?: Record<string, OutputPort | never>;
  destroy?: () => void;
  setValues?: (values?: any) => void;
}

export type CreateWNAudioNode<T = WNAudioNode> = (
  audioContext: AudioContext,
  data?: WNNodeData,
) => T | Promise<T>;

export type NodeDefaultConfig = {
  size?: { width: number; height: number };
};

export interface WNNodeData<
  Values = Record<string, unknown>,
  Config = Record<string, unknown>,
> {
  label: string;
  values?: Values;
  config?: Config & NodeDefaultConfig;
}

export type WNNode = Node<WNNodeData>;
export type WNEdge = Edge;

export interface GraphState {
  nodes: WNNode[];
  edges: WNEdge[];
}

export type ControlPanelNodes = Array<{
  id: WNNode["id"];
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}>;

export interface ControlPanelState {
  show: boolean;
  nodes: ControlPanelNodes;
  size: { width: number; height: number };
}

export interface EditorStoreState extends GraphState {
  controlPanel: ControlPanelState;
}

export interface EditorState extends EditorStoreState {
  viewport: Viewport;
}

export type ProjectFile = {
  id: string;
  name?: string;
  type?: "patch" | "blob";
  file: EditorState;
};

export interface Project {
  files: Array<ProjectFile>;
}

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
  controlPanelNode?: ControlPanelNode;
  configNode?: ConfigNode;
  defaultConfig?: any;
  resizable?: boolean;
  description?: string;
  portsDescription?: {
    inputs?: Record<string, string>;
    outputs?: Record<string, string>;
  };
  name?: string;
  info?: string;
  tags?: string[];
}

export interface PluginConfig {
  id?: string;
  components: Array<PluginComponent>;
  name?: string;
  description?: string;
}
