import { PluginConfig } from "@web-noise/core";
import { WNNode } from "@web-noise/core";

import ParameterComponent from "./src/Parameter";
import AudioInputComponent from "./src/AudioInput";
import FrequencyMeter from "./src/FrequencyMeter";
import Scale from "./src/Scale";
import Delay from "./src/Delay";
import Quantizer from "./src/Quantizer";
import Patch from "./src/Patch";
import Gain from "./src/nodes/Gain";
import { gain } from "./src/audioNodes/gain";
import Destination from "./src/nodes/Destination";
import { destination } from "./src/audioNodes/destination";
import Filter from "./src/nodes/Filter";
import { filter } from "./src/audioNodes/filter";
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
import Oscilloscope from "./src/Oscilloscope";
import VirtualKeyboard from "./src/nodes/VirtualKeyboard";
import { virtualKeyboard } from "./src/audioNodes/virtualKeyboard";
import RandomSequencer from "./src/nodes/RandomSequencer";
import {
  randomSequencer,
  randomSequencerWorklet,
} from "./src/audioNodes/randomSequencer";
import StepSequencer from "./src/nodes/StepSequencer";
import {
  stepSequencer,
  stepSequencerWorklet,
} from "./src/audioNodes/stepSequencer";
import { Script, WorkletScript } from "./src/Script";
import { Gate } from "./src/Gate";
import { Select } from "./src/Select";
import MathNode from "./src/nodes/MathNode";
import { math } from "./src/audioNodes/math";
import { midiToFrequency } from "./src/audioNodes/midiToFrequency";
import AudioTrack from "./src/nodes/AudioTrack";
import audioTrack from "./src/audioNodes/audioTrack";
import ValueMeter from "./src/nodes/ValueMeter";
import Sticker from "./src/nodes/Sticker";
import MidiInput from "./src/nodes/MidiInput";
import { midiInput } from "./src/audioNodes/midiInput";
import DataRecorder from "./src/nodes/DataRecorder";
import { dataRecorder } from "./src/audioNodes/dataRecorder";
import MidiNote from "./src/MidiNote";

import Inlet from "./src/nodes/Inlet";
import Outlet from "./src/nodes/Outlet";
import { passThrough } from "./src/audioNodes/passThrough";

export const webAudioNodes: PluginConfig = {
  components: [
    {
      type: "destination",
      node: Destination,
      audioNode: destination,
    },
    { type: "gain", node: Gain, audioNode: gain },
    { type: "filter", node: Filter, audioNode: filter },
    ParameterComponent,
    { type: "oscillator", node: Oscillator, audioNode: oscillator },
    { type: "visualiser", node: Visualiser, audioNode: analyser },
    {
      type: "spectroscope",
      node: Spectroscope,
      audioNode: analyser,
    },
    Delay,
  ],
  name: "Web Audio Api base nodes",
};

export const baseNodes: PluginConfig = {
  components: [
    { type: "reverb", node: Reverb, audioNode: reverb },
    { type: "adsr", node: ADSR, audioNode: adsr },
    { type: "clock", node: Clock, audioNode: clock },
    { type: "whiteNoise", node: WNNode, audioNode: whiteNoise },
    Oscilloscope,
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
    Script,
    WorkletScript,
    Gate,
    Select,
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
    { type: "audioTrack", node: AudioTrack, audioNode: audioTrack },
    { type: "valueMeter", node: ValueMeter, audioNode: Oscilloscope.audioNode },
    { type: "sticker", node: Sticker, audioNode: false },
    {
      type: "midiInput",
      node: MidiInput,
      audioNode: midiInput,
    },
    {
      type: "dataRecorder",
      node: DataRecorder,
      audioNode: dataRecorder,
    },
    MidiNote,
    AudioInputComponent,
    FrequencyMeter,
    Quantizer,
    Scale,
  ],
  name: "Web Noise base nodes",
};

export const patchNodes: PluginConfig = {
  components: [
    Patch,
    { type: "inlet", node: Inlet, audioNode: passThrough },
    { type: "outlet", node: Outlet, audioNode: passThrough },
  ],
  name: "Patch nodes",
};
