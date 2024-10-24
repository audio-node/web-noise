import { PluginConfig } from "@web-noise/core";
import { WNNode } from "@web-noise/core";

import ParameterComponent from "./src/Parameter";
import AudioInputComponent from "./src/AudioInput";
import FrequencyMeter from "./src/FrequencyMeter";
import Scale from "./src/Scale";
import Delay from "./src/Delay";
import DynamicsCompressor from "./src/DynamicsCompressor";
import Quantizer from "./src/Quantizer";
import Patch from "./src/Patch";
import Gain from "./src/nodes/Gain";
import { gain } from "./src/audioNodes/gain";
import Destination from "./src/Destination";
import Filter from "./src/Filter";
import Oscillator from "./src/Oscillator";
import StereoPanner from "./src/StereoPanner";
import Visualiser from "./src/nodes/Visualiser";
import Spectroscope from "./src/Spectroscope";
import { analyser } from "./src/audioNodes/analyser";
import ADSR from "./src/ADSR";
import Gauge from "./src/Gauge";
import Clock from "./src/nodes/Clock";
import { clock } from "./src/audioNodes/clock";
import { whiteNoise } from "./src/audioNodes/whiteNoise";
import Oscilloscope from "./src/Oscilloscope";
import VirtualKeyboard from "./src/nodes/VirtualKeyboard";
import { virtualKeyboard } from "./src/audioNodes/virtualKeyboard";
import RandomSequencer from "./src/nodes/RandomSequencer";
import { randomSequencer } from "./src/audioNodes/randomSequencer";
import { randomSequencerWorklet } from "./src/audioNodes/randomSequencer/workletNode";
import StepSequencer from "./src/nodes/StepSequencer";
import { stepSequencer } from "./src/audioNodes/stepSequencer";
import { stepSequencerWorklet } from "./src/audioNodes/stepSequencer/workletNode";
import { Script, WorkletScript } from "./src/Script";
import { Gate } from "./src/Gate";
import Slider from "./src/Slider";
import { Select } from "./src/Select";
import MathNode from "./src/MathNode";
import { midiToFrequency } from "./src/audioNodes/midiToFrequency";
import AudioTrack from "./src/nodes/AudioTrack";
import audioTrack from "./src/audioNodes/audioTrack";
import ValueMeter from "./src/ValueMeter";
import Sticker from "./src/Sticker";
import MidiInput from "./src/nodes/MidiInput";
import { midiInput } from "./src/audioNodes/midiInput";
import DataRecorder from "./src/nodes/DataRecorder";
import { dataRecorder } from "./src/audioNodes/dataRecorder";
import MidiNote from "./src/MidiNote";
import Convolver from "./src/Convolver";
import WaveShaper from "./src/WaveShaper";
import PhaseVocoder from "./src/PhaseVocoder";
import Distortion from "./src/Distortion";
import Limiter from "./src/Limiter";
import AudioOutput from "./src/AudioOutput";
import ChannelSplitter from "./src/ChannelSplitter";
import ChannelMerger from "./src/ChannelMerger";

import Inlet from "./src/Inlet";
import Outlet from "./src/Outlet";
import PassThrough from "./src/PassThrough";

export const webAudioNodes: PluginConfig = {
  components: [
    Destination,
    { type: "gain", node: Gain, audioNode: gain },
    Filter,
    ParameterComponent,
    Oscillator,
    StereoPanner,
    { type: "visualiser", node: Visualiser, audioNode: analyser },
    Delay,
    DynamicsCompressor,
    Convolver,
    WaveShaper,
    ChannelSplitter,
    ChannelMerger,
  ],
  name: "Web Audio Api base nodes",
};

export const baseNodes: PluginConfig = {
  components: [
    ADSR,
    Gauge,
    { type: "clock", node: Clock, audioNode: clock },
    { type: "whiteNoise", node: WNNode, audioNode: whiteNoise },
    Oscilloscope,
    Spectroscope,
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
    Slider,
    MathNode,
    {
      type: "midiToFrequency",
      node: WNNode,
      audioNode: midiToFrequency,
    },
    { type: "audioTrack", node: AudioTrack, audioNode: audioTrack },
    ValueMeter,
    Sticker,
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
    PhaseVocoder,
    Distortion,
    Limiter,
    AudioOutput,
    PassThrough,
  ],
  name: "Web Noise base nodes",
};

export const patchNodes: PluginConfig = {
  components: [Patch, Inlet, Outlet],
  name: "Patch nodes",
};
