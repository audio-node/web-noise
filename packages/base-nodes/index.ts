import { PluginConfig } from "@web-noise/core";
import { WNNode } from "@web-noise/core";
// import ADSR from "./components/ADSR";
// import Clock from "./components/Clock";
// import DestinationComponent from "./components/Destination";
import Gain from "./src/nodes/Gain";
import { gain } from './src/audioNodes/gain.ts'
import Destination from './src/nodes/Destination'
import { destination } from './src/audioNodes/destination'
import Filter from './src/nodes/Filter'
import { filter } from './src/audioNodes/filter'
import Parameter from './src/nodes/Parameter'
import { constantSource } from './src/audioNodes/constantSource'
// import MathNodeComponent from "./components/MathNode";
// import Oscillator from "./components/Oscillator";
// import Oscilloscope from "./components/Oscilloscope";
// import RandomSequencer from "./components/RandomSequencer";
// import Reverb from "./components/Reverb";
// import ScriptNode from "./components/ScriptNode";
// import Spectroscope from "./components/Spectroscope";
// import StepSequencer from "./components/StepSequencer";
// import VirtualKeyboard from "./components/VirtualKeyboard";
// import Visualiser from "./components/Visualiser";
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
  ],
  name: "Web Audio Api base nodes",
};

export const baseNodes: PluginConfig = {
  components: [
    // { type: "oscillator", node: Oscillator, audioNode: audioNodes.oscillator },
    // { type: "visualiser", node: Visualiser, audioNode: audioNodes.analyser },
    // {
    //   type: "spectroscope",
    //   node: Spectroscope,
    //   audioNode: audioNodes.analyser,
    // },
    // {
    //   type: "oscilloscope",
    //   node: Oscilloscope,
    //   audioNode: audioNodes.analyserWorklet,
    // },
    // { type: "whiteNoise", node: WhiteNoise, audioNode: audioNodes.whiteNoise },
    // { type: "reverb", node: Reverb, audioNode: audioNodes.reverb },
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
    // { type: "adsr", node: ADSR, audioNode: audioNodes.adsr },
    // {
    //   type: "midiToFrequency",
    //   node: WNNode,
    //   audioNode: audioNodes.midiToFrequency,
    // },
  ],
  name: "Web Noise base nodes",
};
