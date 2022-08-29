import { WNNode } from "@web-noise/core";
import MathNodeComponent from "./components/MathNode";
import { PluginConfig } from "@web-noise/core";
import RandomSequencer from "./components/RandomSequencer";
import ScriptNode from "./components/ScriptNode";
import StepSequencer from "./components/StepSequencer";
import { nodeTypes as audioNodes } from "./nodes";

const plugin: PluginConfig = {
  components: [
    {
      type: "randomSequencer",
      node: RandomSequencer,
      audioNode: audioNodes.randomSequencer,
    },
    {
      type: "randomSequencerWorklet",
      node: RandomSequencer,
      audioNode: audioNodes.randomSequencerWorklet,
    },
    { type: "scriptNode", node: ScriptNode, audioNode: audioNodes.scriptNode },
    {
      type: "mathNode",
      node: MathNodeComponent,
      audioNode: audioNodes.mathNode,
    },
    {
      type: "stepSequencer",
      node: StepSequencer,
      audioNode: audioNodes.stepSequencer,
    },
    {
      type: "stepSequencerWorklet",
      node: StepSequencer,
      audioNode: audioNodes.stepSequencerWorklet,
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
