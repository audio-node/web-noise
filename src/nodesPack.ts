import { WNNode } from "@web-noise/core";
import ADSR from "./components/ADSR";
import Clock from "./components/Clock";
import Filter from "./components/Filter";
import MathNodeComponent from "./components/MathNode";
import { PluginConfig } from "@web-noise/core";
import Oscillator from "./components/Oscillator";
import Oscilloscope from "./components/Oscilloscope";
import Parameter from "./components/Parameter";
import RandomSequencer from "./components/RandomSequencer";
import Reverb from "./components/Reverb";
import ScriptNode from "./components/ScriptNode";
import Spectroscope from "./components/Spectroscope";
import StepSequencer from "./components/StepSequencer";
import VirtualKeyboard from "./components/VirtualKeyboard";
import Visualiser from "./components/Visualiser";
import WhiteNoise from "./components/WhiteNoise";
import { nodeTypes as audioNodes } from "./nodes";

const plugin: PluginConfig = {
  components: [
    { type: "oscillator", node: Oscillator, audioNode: audioNodes.oscillator },
    { type: "visualiser", node: Visualiser, audioNode: audioNodes.analyser },
    {
      type: "spectroscope",
      node: Spectroscope,
      audioNode: audioNodes.analyser,
    },
    {
      type: "oscilloscope",
      node: Oscilloscope,
      audioNode: audioNodes.analyserWorklet,
    },
    { type: "whiteNoise", node: WhiteNoise, audioNode: audioNodes.whiteNoise },
    { type: "filter", node: Filter, audioNode: audioNodes.filter },
    {
      type: "parameter",
      node: Parameter,
      audioNode: audioNodes.constantSource,
    },
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
