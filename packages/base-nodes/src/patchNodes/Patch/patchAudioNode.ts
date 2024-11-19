import type { EditorState, OutputPort, WNAudioNode } from "@web-noise/core";
import { createPatch } from "@web-noise/patch";
import fetch from "@web-noise/fetch";
import { PatchData, PatchValues } from "./types";

export interface Patch extends WNAudioNode {
  patchData: EditorState;
}

export const getPatchData = async (
  values: PatchValues,
): Promise<EditorState> => {
  const { url, patch } = values;

  if (patch) {
    return patch;
  }

  if (typeof url !== "string") {
    throw new Error("patch url is not specified");
  }

  const data: EditorState = await fetch(url).then((r) => r.json());

  if (typeof data === "undefined") {
    throw new Error("patch data is undefined");
  }

  return data;
};

export const patchNode = async (
  audioContext: AudioContext,
  data?: PatchData,
): Promise<Patch | {}> => {
  const values = data?.values;

  if (!values) {
    return {};
  }

  const patchData = await getPatchData(values);

  const { nodes, edges } = patchData;
  const { nodes: controlPanelNodes } = values || {};

  const patch = createPatch(audioContext);

  await patch.registerAudioNodes(nodes);
  patch.registerAudioConnections(edges);

  const { audioNodes } = patch;

  const { inputs, outputs } = nodes.reduce(
    (acc, node) => {
      const { type, id, data } = node;
      const { label } = data;

      if (type === "inlet") {
        const input = audioNodes?.get(id)?.node?.inputs?.in;
        if (!input) {
          return acc;
        }
        return {
          ...acc,
          inputs: {
            ...acc.inputs,
            [label || `in-${+new Date()}`]: input,
          },
        };
      }

      if (node.type === "outlet") {
        const output = audioNodes?.get(id)?.node?.outputs?.out;
        if (!output) {
          return acc;
        }
        return {
          ...acc,
          outputs: {
            ...acc.outputs,
            [label || `out-${+new Date()}`]: output,
          },
        };
      }

      return acc;
    },
    { inputs: [] as OutputPort[], outputs: [] as OutputPort[] },
  );

  nodes.forEach(({ id, data: { values } }) => {
    const node = audioNodes.get(id);
    const setValues = node?.node?.setValues;
    if (values && setValues) {
      setValues(values);
    }
  });

  Object.keys(controlPanelNodes || {}).forEach((id) => {
    const values = controlPanelNodes?.[id];
    const node = audioNodes.get(id);
    node?.node?.setValues?.(values);
  });

  return {
    inputs,
    outputs,
    patchData: patchData,
    audioNodes,
    destroy: () => {
      //disconnect all nodes from each other
      //unregister all nodes
      audioNodes.forEach(({ node }) => node?.destroy?.());
    },
  };
};

export default patchNode;
