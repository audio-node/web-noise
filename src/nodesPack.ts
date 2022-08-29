import { WNNode } from "@web-noise/core";
import MathNodeComponent from "./components/MathNode";
import { PluginConfig } from "@web-noise/core";
import ScriptNode from "./components/ScriptNode";
import { nodeTypes as audioNodes } from "./nodes";

const plugin: PluginConfig = {
  components: [
    { type: "scriptNode", node: ScriptNode, audioNode: audioNodes.scriptNode },
    {
      type: "mathNode",
      node: MathNodeComponent,
      audioNode: audioNodes.mathNode,
    },
    {
      type: "midiToFrequency",
      node: WNNode,
      audioNode: audioNodes.midiToFrequency,
    },
  ],
  name: "Web Noise base components",
};

export default plugin;
