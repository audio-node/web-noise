import { PluginConfig } from "@web-noise/core/src/types";

import AudioInputComponent from "@web-noise/base-nodes/src/AudioInput/audioNode";
import ADSR from "@web-noise/base-nodes/src/ADSR/audioNode";
import { analyser } from "@web-noise/base-nodes/src/audioNodes/analyser";
import audioTrack from "@web-noise/base-nodes/src/audioNodes/audioTrack";
import { clock } from "@web-noise/base-nodes/src/audioNodes/clock";
import { dataRecorder } from "@web-noise/base-nodes/src/audioNodes/dataRecorder";
import destination from "@web-noise/base-nodes/src/Destination/audioNode";
import { gain } from "@web-noise/base-nodes/src/audioNodes/gain";
import { midiInput } from "@web-noise/base-nodes/src/audioNodes/midiInput";
import { midiToFrequency } from "@web-noise/base-nodes/src/audioNodes/midiToFrequency";
import { randomSequencerWorklet } from "@web-noise/base-nodes/src/audioNodes/randomSequencer/workletNode";
import { stepSequencerWorklet } from "@web-noise/base-nodes/src/audioNodes/stepSequencer/workletNode";
// import { virtualKeyboard } from "@web-noise/base-nodes/src/audioNodes/virtualKeyboard";
import { whiteNoise } from "@web-noise/base-nodes/src/audioNodes/whiteNoise";
import Delay from "@web-noise/base-nodes/src/Delay/audioNode";
import DynamicsCompressor from "@web-noise/base-nodes/src/DynamicsCompressor/audioNode";
import Filter from "@web-noise/base-nodes/src/Filter/audioNode";
import FrequencyMeter from "@web-noise/base-nodes/src/FrequencyMeter/audioNode";
import Gate from "@web-noise/base-nodes/src/Gate/audioNode";
import MathNode from "@web-noise/base-nodes/src/MathNode/audioNode";
import Oscillator from "@web-noise/base-nodes/src/Oscillator/audioNode";
import Oscilloscope from "@web-noise/base-nodes/src/Oscilloscope/audioNode";
import ParameterComponent from "@web-noise/base-nodes/src/Parameter/constantSource";
import Patch from "@web-noise/base-nodes/src/Patch/patchAudioNode";
import Quantizer from "@web-noise/base-nodes/src/Quantizer/audioNode";
import Reverb from "@web-noise/base-nodes/src/Reverb/audioNode";
import Scale from "@web-noise/base-nodes/src/Scale/audioNode";
import {
  default as MidiNote,
  default as Select,
} from "@web-noise/base-nodes/src/Select/audioNode";
import MidiNoteConfig from "@web-noise/base-nodes/src/Select/defaultConfig";
import Slider from "@web-noise/base-nodes/src/Slider/audioNode";
import Spectroscope from "@web-noise/base-nodes/src/Spectroscope/audioNode";
import StereoPanner from "@web-noise/base-nodes/src/StereoPanner/audioNode";
import ValueMeter from "@web-noise/base-nodes/src/ValueMeter/audioNode";
import Convolver from "@web-noise/base-nodes/src/Convolver/audioNode";
import WaveShaper from "@web-noise/base-nodes/src/WaveShaper/audioNode";
import PhaseVocoder from "@web-noise/base-nodes/src/PhaseVocoder/audioNode";
import Distortion from "@web-noise/base-nodes/src/Distortion/audioNode";
import Limiter from "@web-noise/base-nodes/src/Limiter/audioNode";

import PassThrough from "@web-noise/base-nodes/src/PassThrough/audioNode";

const Inlet = PassThrough;
const Outlet = PassThrough;

export const webAudioNodes: PluginConfig = {
  components: [
    {
      type: "destination",
      node: null,
      audioNode: destination,
    },
    { type: "gain", node: null, audioNode: gain },
    { type: "filter", node: null, audioNode: Filter },
    { type: "parameter", node: null, audioNode: ParameterComponent },
    { type: "oscillator", node: null, audioNode: Oscillator },
    { type: "stereoPanner", node: null, audioNode: StereoPanner },
    { type: "visualiser", node: null, audioNode: analyser },
    { type: "delay", node: null, audioNode: Delay },
    { type: "dynamicsCompressor", node: null, audioNode: DynamicsCompressor },
    { type: "convolver", node: null, audioNode: Convolver },
    { type: "waveShaper", node: null, audioNode: WaveShaper },
  ],
  name: "Web Audio Api base nodes",
};

export const baseNodes: PluginConfig = {
  components: [
    { type: "reverb", node: null, audioNode: Reverb },
    { type: "adsr", node: null, audioNode: ADSR },
    { type: "clock", node: null, audioNode: clock },
    { type: "whiteNoise", node: null, audioNode: whiteNoise },
    { type: "oscilloscope", node: null, audioNode: Oscilloscope },
    { type: "spectroscope", node: null, audioNode: Spectroscope },
    // {
    //   type: "virtualKeyboard",
    //   node: null,
    //   audioNode: virtualKeyboard,
    // },
    {
      type: "randomSequencer",
      node: null,
      audioNode: randomSequencerWorklet,
    },
    {
      type: "randomSequencerWorklet",
      node: null,
      audioNode: randomSequencerWorklet,
    },
    {
      type: "stepSequencer",
      node: null,
      audioNode: stepSequencerWorklet,
    },
    {
      type: "stepSequencerWorklet",
      node: null,
      audioNode: stepSequencerWorklet,
    },
    { type: "script", node: null, audioNode: false },
    { type: "workletScript", node: null, audioNode: false },
    { type: "gate", node: null, audioNode: Gate },
    { type: "select", node: null, audioNode: Select },
    { type: "slider", node: null, audioNode: Slider },
    { type: "mathNode", node: null, audioNode: MathNode },
    {
      type: "midiToFrequency",
      node: null,
      audioNode: midiToFrequency,
    },
    { type: "audioTrack", node: null, audioNode: audioTrack },
    { type: "valueMeter", node: null, audioNode: ValueMeter },
    { type: "gauge", node: null, audioNode: ValueMeter },
    { type: "sticker", node: null, audioNode: false },
    {
      type: "midiInput",
      node: null,
      audioNode: midiInput,
    },
    {
      type: "dataRecorder",
      node: null,
      audioNode: dataRecorder,
    },
    {
      type: "midiNote",
      node: null,
      audioNode: MidiNote,
      defaultConfig: MidiNoteConfig,
    },
    {
      type: "audioInput",
      node: null,
      audioNode: AudioInputComponent,
    },
    { type: "frequencyMeter", node: null, audioNode: FrequencyMeter },
    { type: "quantizer", node: null, audioNode: Quantizer },
    { type: "scale", node: null, audioNode: Scale },
    { type: "phaseVocoder", node: null, audioNode: PhaseVocoder },
    { type: "distortion", node: null, audioNode: Distortion },
    { type: "limiter", node: null, audioNode: Limiter },
    { type: "passThrough", node: null, audioNode: PassThrough },
  ],
  name: "Web Noise base nodes",
};

export const patchNodes: PluginConfig = {
  components: [
    {
      type: "patch",
      node: null,
      audioNode: Patch,
    },
    { type: "inlet", node: null, audioNode: Inlet },
    { type: "outlet", node: null, audioNode: Outlet },
  ],
  name: "Patch nodes",
};

export const plugins = [baseNodes, webAudioNodes, patchNodes];
