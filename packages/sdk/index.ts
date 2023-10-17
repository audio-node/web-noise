/**
 * This module provides functions and types for creating and managing web-noise audio patches.
 * @module PatchManager
 */

import {
  WNNode,
  WNEdge,
  AudioNodeTypes,
  PluginConfig,
  EditorState,
} from "@web-noise/core/src/types";

import createPatch, { Patch } from "@web-noise/core/src/patch/createPatch";
import { plugins } from "./plugins";

type GetPluginNodes = (plugins: PluginConfig[]) => AudioNodeTypes;

/**
 * Retrieves audio node creators from a list of plugins.
 *
 * @param plugins - An array of plugins.
 * @returns An object mapping audio node types to their audio nodes creator.
 */
export const getPluginNodes: GetPluginNodes = (plugins) => {
  return plugins.reduce((acc, plugin) => {
    return {
      ...acc,
      ...plugin.components.reduce(
        (subAcc, item) => ({
          ...subAcc,
          [item.type]: item.audioNode,
        }),
        {},
      ),
    };
  }, {});
};

/**
 * Web noise patch object.
 */
interface SDKPatch {
  audioContext: AudioContext;
  patch: Patch;
}

/**
 * Initializes an audio patch, creating an AudioContext and setting up audio nodes.
 *
 * @param audioContext - An optional AudioContext to use. If not provided, a new one will be created.
 * @returns A promise that resolves to an SDKPatch object.
 */
type InitPatch = (audioContext: AudioContext) => Promise<SDKPatch>;

export const initPatch: InitPatch = async (
  audioContext = new AudioContext(),
) => {
  const patch = createPatch(audioContext);

  const audioNodeTypes = getPluginNodes(plugins);
  patch.setAudioNodeTypes(audioNodeTypes);

  return { audioContext, patch };
};

interface CreatePatchNodeProps {
  data: EditorState;
  audioContext?: AudioContext;
}

/**
 * Interface representing a patch node, including its inputs, outputs, and audio nodes.
 */
interface PatchNode {
  inputs: Record<string, AudioWorkletNode>;
  outputs: Record<string, AudioWorkletNode>;
  audioNodes: Patch["audioNodes"];
}

type createPatchNode = (props: CreatePatchNodeProps) => Promise<PatchNode>;

/**
 * Creates a patch node based on the provided patch data and audio context.
 *
 * @param props - Patch data
 * @returns A patch node.
 */
export const createPatchNode: createPatchNode = async ({
  data,
  audioContext = new AudioContext(),
}) => {
  const { patch } = await initPatch(audioContext);

  const nodes = data.nodes;
  const edges: any = data.edges;

  await patch.registerAudioNodes(nodes);
  patch.registerAudioConnections(edges);

  const { audioNodes } = patch;

  // @deprecated
  nodes.forEach((node) => {
    audioNodes.get(node.id)?.node?.setValues?.(node.data.values);
  });

  const { inlets, outlets } = nodes.reduce(
    (acc, node) => {
      if (node.type === "inlet") {
        acc.inlets.push(node);
      }
      if (node.type === "outlet") {
        acc.outlets.push(node);
      }
      return acc;
    },
    { inlets: [] as WNNode[], outlets: [] as WNNode[] },
  );

  const inputs = inlets.reduce((acc, { id, data: { label } }) => {
    const input = audioNodes?.get(id)?.node?.inputs?.in;
    if (!input) {
      return acc;
    }
    return {
      ...acc,
      [label || `in-${+new Date()}`]: input.port,
    };
  }, {});

  const outputs = outlets.reduce((acc, { id, data: { label } }) => {
    const output = audioNodes?.get(id)?.node?.outputs?.out;
    if (!output) {
      return acc;
    }
    return {
      ...acc,
      [label]: output.port,
    };
  }, {});

  return { inputs, outputs, audioNodes };
};

export type { WNEdge, WNNode, EditorState };
