import { Node as DefaultNode } from "@web-noise/core";
import ADSR from "./components/ADSR";
import Clock from "./components/Clock";
import DestinationComponent from "./components/Destination";
import EnvelopeComponent from "./components/Envelope";
import Filter from "./components/Filter";
import Gain from "./components/Gain";
import MathNodeComponent from "./components/MathNode";
import { EditorConfig } from "@web-noise/core";
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

const packConfig: EditorConfig = {
  nodes: {
    oscillator: Oscillator,
    gain: Gain,
    visualiser: Visualiser,
    spectroscope: Spectroscope,
    oscilloscope: Oscilloscope,
    destination: DestinationComponent,
    whiteNoise: WhiteNoise,
    filter: Filter,
    parameter: Parameter,
    reverb: Reverb,
    randomSequencer: RandomSequencer,
    randomSequencerWorklet: RandomSequencer,
    envelope: EnvelopeComponent,
    scriptNode: ScriptNode,
    mathNode: MathNodeComponent,
    virtualKeyboard: VirtualKeyboard,
    clock: Clock,
    stepSequencer: StepSequencer,
    stepSequencerWorklet: StepSequencer,
    adsr: ADSR,
    midiToFrequency: DefaultNode,
  },
  audioNodes: {
    ...audioNodes,
    visualiser: audioNodes.analyser,
    spectroscope: audioNodes.analyser,
    oscilloscope: audioNodes.analyserWorklet,
    parameter: audioNodes.constantSource,
  },
};

export default packConfig;
