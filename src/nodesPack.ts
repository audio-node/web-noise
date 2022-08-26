import { WNNode } from "@web-noise/core";
import ADSR from "./components/ADSR";
import Clock from "./components/Clock";
import MathNodeComponent from "./components/MathNode";
import { PluginConfig } from "@web-noise/core";
import Oscilloscope from "./components/Oscilloscope";
import RandomSequencer from "./components/RandomSequencer";
import Reverb from "./components/Reverb";
import ScriptNode from "./components/ScriptNode";
import StepSequencer from "./components/StepSequencer";
import VirtualKeyboard from "./components/VirtualKeyboard";
import WhiteNoise from "./components/WhiteNoise";
import { nodeTypes as audioNodes } from "./nodes";

const plugin: PluginConfig = {
  components: [
    {
      type: "oscilloscope",
      node: Oscilloscope,
      audioNode: audioNodes.analyserWorklet,
    },
    { type: "whiteNoise", node: WhiteNoise, audioNode: audioNodes.whiteNoise },
    { type: "reverb", node: Reverb, audioNode: audioNodes.reverb },
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
      type: "virtualKeyboard",
      node: VirtualKeyboard,
      audioNode: audioNodes.virtualKeyboard,
    },
    { type: "clock", node: Clock, audioNode: audioNodes.clock },
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
    { type: "adsr", node: ADSR, audioNode: audioNodes.adsr },
    {
      type: "midiToFrequency",
      node: WNNode,
      audioNode: audioNodes.midiToFrequency,
    },
  ],
  name: "Web Noise base components",
};

export default plugin;
