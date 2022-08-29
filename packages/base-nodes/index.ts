import { PluginConfig } from "@web-noise/core";
import { WNNode } from "@web-noise/core";
import Gain from "./src/nodes/Gain";
import { gain } from "./src/audioNodes/gain";
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
import Clock from "./src/nodes/Clock";
import { clock } from "./src/audioNodes/clock";
import { whiteNoise } from "./src/audioNodes/whiteNoise";
import Oscilloscope from "./src/nodes/Oscilloscope";
import { oscilloscope } from "./src/audioNodes/oscilloscope";
import VirtualKeyboard from "./src/nodes/VirtualKeyboard";
import { virtualKeyboard } from "./src/audioNodes/virtualKeyboard";
import RandomSequencer from "./src/nodes/RandomSequencer";
import { randomSequencer, randomSequencerWorklet } from "./src/audioNodes/randomSequencer";
import StepSequencer from "./src/nodes/StepSequencer";
import { stepSequencer, stepSequencerWorklet } from "./src/audioNodes/stepSequencer";
import ScriptNode from "./src/nodes/ScriptNode";
import { scriptNode } from "./src/audioNodes/scriptNode";
import MathNode from "./src/nodes/MathNode";
import { math } from "./src/audioNodes/math";
import { midiToFrequency } from "./src/audioNodes/midiToFrequency";
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
    { type: "clock", node: Clock, audioNode: clock },
    { type: "whiteNoise", node: WNNode, audioNode: whiteNoise },
    {
      type: "oscilloscope",
      node: Oscilloscope,
      audioNode: oscilloscope,
    },
    {
      type: "virtualKeyboard",
      node: VirtualKeyboard,
      audioNode: virtualKeyboard,
    },
    {
      type: "randomSequencer",
      node: RandomSequencer,
      audioNode: randomSequencer,
    },
    {
      type: "randomSequencerWorklet",
      node: RandomSequencer,
      audioNode: randomSequencerWorklet,
    },
    {
      type: "stepSequencer",
      node: StepSequencer,
      audioNode: stepSequencer,
    },
    {
      type: "stepSequencerWorklet",
      node: StepSequencer,
      audioNode: stepSequencerWorklet,
    },
    { type: "scriptNode", node: ScriptNode, audioNode: scriptNode },
    {
      type: "mathNode",
      node: MathNode,
      audioNode: math,
    },
    {
      type: "midiToFrequency",
      node: WNNode,
      audioNode: midiToFrequency,
    },
  ],
  name: "Web Noise base nodes",
};
