import { PluginComponent, EditorState, TWNNode } from "@web-noise/core";
import patchNode from "./patchAudioNode";
import Patch from "./Patch";

const plugin: PluginComponent = {
  type: "patch",
  node: Patch,
  audioNode: patchNode,
  containerNode: async (node: TWNNode) => {
    if (typeof node.data?.values?.url !== "string") {
      return;
    }
    const data: EditorState = await fetch(node.data.values.url).then((r) =>
      r.json()
    );

    return data;
  },
};

export default plugin;
