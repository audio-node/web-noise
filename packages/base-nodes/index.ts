import { PluginConfig } from "@web-noise/core";
import { WNNode } from "@web-noise/core";
// import Clock from "./components/Clock";
// import DestinationComponent from "./components/Destination";
import Gain from "./src/nodes/Gain";
import { gain } from "./src/audioNodes/gain.ts";
import Destination from "./src/nodes/Destination";
import { destination } from "./src/audioNodes/destination";
import Filter from "./src/nodes/Filter";
import { filter } from "./src/audioNodes/filter";
import Parameter from "./src/nodes/Parameter";
import { constantSource } from "./src/audioNodes/constantSource";
import Oscillator from "./src/nodes/Oscillator";
import { oscillator } from "./src/audioNodes/oscillator";
import Visualiser from "./src/nodes/Visualiser";
import Spectroscope from "./src/nodes/Spectroscope";
import { analyser } from "./src/audioNodes/analyser";
import Reverb from "./src/nodes/Reverb";
import { reverb } from "./src/audioNodes/reverb";
import ADSR from "./src/nodes/ADSR";
import { adsr } from "./src/audioNodes/adsr";
// import MathNodeComponent from "./components/MathNode";
// import Oscilloscope from "./components/Oscilloscope";
// import RandomSequencer from "./components/RandomSequencer";
// import ScriptNode from "./components/ScriptNode";
// import StepSequencer from "./components/StepSequencer";
// import VirtualKeyboard from "./components/VirtualKeyboard";
// import WhiteNoise from "./components/WhiteNoise";
// import { nodeTypes as audioNodes } from "./nodes";
export const webAudioNodes: PluginConfig = {
  components: [
    {
      type: "destination",
      node: Destination,
      audioNode: destination,
    },
    { type: "gain", node: Gain, audioNode: gain },
    { type: "filter", node: Filter, audioNode: filter },
    {
      type: "parameter",
      node: Parameter,
      audioNode: constantSource,
    },
    { type: "oscillator", node: Oscillator, audioNode: oscillator },
    { type: "visualiser", node: Visualiser, audioNode: analyser },
    {
      type: "spectroscope",
      node: Spectroscope,
      audioNode: analyser,
    },
  ],
  name: "Web Audio Api base nodes",
};

export const baseNodes: PluginConfig = {
  components: [
    { type: "reverb", node: Reverb, audioNode: reverb },
    { type: "adsr", node: ADSR, audioNode: adsr },
    // {
    //   type: "oscilloscope",
    //   node: Oscilloscope,
    //   audioNode: audioNodes.analyserWorklet,
    // },
    // { type: "whiteNoise", node: WhiteNoise, audioNode: audioNodes.whiteNoise },
    // {
    //   type: "randomSequencer",
    //   node: RandomSequencer,
    //   audioNode: audioNodes.randomSequencer,
    // },
    // {
    //   type: "randomSequencerWorklet",
    //   node: RandomSequencer,
    //   audioNode: audioNodes.randomSequencerWorklet,
    // },
    // { type: "scriptNode", node: ScriptNode, audioNode: audioNodes.scriptNode },
    // {
    //   type: "mathNode",
    //   node: MathNodeComponent,
    //   audioNode: audioNodes.mathNode,
    // },
    // {
    //   type: "virtualKeyboard",
    //   node: VirtualKeyboard,
    //   audioNode: audioNodes.virtualKeyboard,
    // },
    // { type: "clock", node: Clock, audioNode: audioNodes.clock },
    // {
    //   type: "stepSequencer",
    //   node: StepSequencer,
    //   audioNode: audioNodes.stepSequencer,
    // },
    // {
    //   type: "stepSequencerWorklet",
    //   node: StepSequencer,
    //   audioNode: audioNodes.stepSequencerWorklet,
    // },
    // {
    //   type: "midiToFrequency",
    //   node: WNNode,
    //   audioNode: audioNodes.midiToFrequency,
    // },
  ],
  name: "Web Noise base nodes",
};
