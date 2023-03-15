import {
  createPatch,
  EditorState,
  TWNNode,
  WNAudioNode,
  WNNodeData,
} from "@web-noise/core";

export interface PatchValues {
  patch?: EditorState;
}

export interface Patch extends WNAudioNode {
  patch?: EditorState;
}

export const patchNode = async (
  audioContext: AudioContext,
  data: WNNodeData<PatchValues>
): Promise<Patch> => {
  const patchData = data.values?.patch;
  if (typeof patchData === "undefined") {
    return {};
  }
  const nodes = patchData.nodes;
  const edges = patchData.edges;

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
    { inlets: [] as TWNNode[], outlets: [] as TWNNode[] }
  );

  const patch = createPatch(audioContext);

  await patch.registerAudioNodes(nodes);
  patch.registerAudioConnections(edges);

  const { audioNodes } = patch;

  const inputs = inlets.reduce((acc, { id, data: { label } }) => {
    const input = audioNodes?.get(id)?.node?.inputs?.in;
    if (!input) {
      return acc;
    }
    return {
      ...acc,
      [label || `in-${+new Date()}`]: input,
    };
  }, {});

  const outputs = outlets.reduce((acc, { id, data: { label } }) => {
    const output = audioNodes?.get(id)?.node?.outputs?.out;
    if (!output) {
      return acc;
    }
    return {
      ...acc,
      [label || `out-${+new Date()}`]: output,
    };
  }, {});

  nodes.forEach(({ id, data: { values } }) => {
    const node = audioNodes.get(id);
    const setValues = node?.node?.setValues;
    if (values && setValues) {
      setValues(values);
    }
  });

  return {
    inputs,
    outputs,
    patch: patchData,
    audioNodes,
    destroy: () => {
      //disconnect all nodes from each other
      //unregister all nodes
    },
  };
};

export default patchNode;
