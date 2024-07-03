/**
 * This module provides functions and types for creating and managing web-noise audio patches.
 * @module sdk
 */


import {
  type Patch as PatchAudioNode,
  patchNode,
} from "../base-nodes/src/Patch/patchAudioNode";
import type { EditorState, WNEdge, WNNode, EditorStoreState } from "../core/src/types";

import { type Patch, setAudioNodeTypes } from "@web-noise/patch";
import { flattenPorts, getPluginNodes } from "./helpers";
import { plugins } from "./plugins";

setAudioNodeTypes(getPluginNodes(plugins));

/**
 * Interface representing a patch initialisation properties.
 */
interface CreatePatchNodeProps {
  data: EditorState;
  audioContext?: AudioContext;
}

/**
 * Interface representing a patch node, including its inputs, outputs, and audio nodes.
 */
export interface PatchNode {
  inputs: Record<string, AudioWorkletNode>;
  outputs: Record<string, AudioWorkletNode>;
  audioNodes: Patch["audioNodes"];
}

type createPatchNode = (props: CreatePatchNodeProps) => Promise<PatchNode>;

/**
 * Creates a patch node based on the provided patch data and audio context.
 *
 * @param props - Patch initialisation parameters
 * @param props.data - Patch data
 * @param props.audioContext - Patch audio context
 * @returns A patch node.
 */
export const createPatchNode: createPatchNode = async ({
  data,
  audioContext = new AudioContext(),
}) => {
  const patch = await patchNode(audioContext, {
    values: { patch: data },
    label: "root",
  });

  if (Object.keys(patch).length === 0) {
    throw new Error("could not initialise patch");
  }

  const {
    inputs = {},
    outputs = {},
    audioNodes,
    destroy = () => {},
  } = patch as PatchAudioNode;

  return {
    inputs: flattenPorts(inputs) as PatchNode["inputs"],
    outputs: flattenPorts(outputs) as PatchNode["outputs"],
    audioNodes,
    destroy,
  };
};

export type { WNEdge, WNNode, EditorState, EditorStoreState };
