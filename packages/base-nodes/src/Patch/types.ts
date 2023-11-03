import type {
  WNNodeData,
  WNNodeProps,
  TWNNode,
  EditorState,
} from "@web-noise/core";

export interface PatchValues {
  patch?: EditorState;
  url?: string;
  nodes?: Record<TWNNode["id"], unknown>;
}

export interface PatchConfig {
  url?: string;
}

export type PatchData = WNNodeData<PatchValues, PatchConfig>;

export interface PatchProps extends WNNodeProps<PatchData> {}
