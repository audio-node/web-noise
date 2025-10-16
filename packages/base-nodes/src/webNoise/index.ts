import { type PluginConfig } from "@web-noise/core";

import ADSR from "./ADSR";
import AudioOutput from "./AudioOutput";
import Distortion from "./Distortion";
import FrequencyMeter from "./FrequencyMeter";
import Gate from "./Gate";
import Gauge from "./Gauge";
import Limiter from "./Limiter";
import MathNode from "./MathNode";
import MidiNote from "./MidiNote";
import Oscilloscope from "./Oscilloscope";
import PhaseVocoder from "./PhaseVocoder";
import Quantizer from "./Quantizer";
import Scale from "./Scale";
import Select from "./Select";
import Slider from "./Slider";
import Spectroscope from "./Spectroscope";
import Sticker from "./Sticker";
import ValueMeter from "./ValueMeter";
import MidiToFrequency from "./MidiToFrequency";
import WhiteNoise from "./WhiteNoise";
import AudioTrack from "./AudioTrack";
import Clock from "./Clock";
import DataRecorder from "./DataRecorder";
import MidiInput from "./MidiInput";
import RandomSequencer from "./RandomSequencer";
import Sequencer from "./Sequencer";
import VirtualKeyboard from "./VirtualKeyboard";
import AudioRecorder from "./AudioRecorder";
import PassThrough from "./PassThrough";

export const webNoiseNodes: PluginConfig = {
  components: [
    ADSR,
    Gauge,
    Clock,
    WhiteNoise,
    Oscilloscope,
    Spectroscope,
    VirtualKeyboard,
    RandomSequencer,
    Sequencer,
    Gate,
    Select,
    Slider,
    MathNode,
    MidiToFrequency,
    AudioTrack,
    ValueMeter,
    Sticker,
    MidiInput,
    DataRecorder,
    MidiNote,
    FrequencyMeter,
    Quantizer,
    Scale,
    PhaseVocoder,
    Distortion,
    Limiter,
    AudioOutput,
    AudioRecorder,
    PassThrough,
  ],
  name: "Web Noise base nodes",
  description:
    "Advanced synthesis tools, effects processors, sequencers, and utilities for modular audio production",
};

export default webNoiseNodes;
