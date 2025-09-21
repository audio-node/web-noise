import { type PluginConfig } from "@web-noise/core";

import ADSR from "./ADSR/base";
import AudioInputPlugin from "./AudioInput/base";
import AudioOutput from "./AudioOutput/base";
import Distortion from "./Distortion/base";
import FrequencyMeter from "./FrequencyMeter/base";
import Gate from "./Gate/base";
import Gauge from "./Gauge/base";
import Limiter from "./Limiter/base";
import MathNode from "./MathNode/base";
import MidiNote from "./MidiNote/base";
import Oscilloscope from "./Oscilloscope/base";
import PhaseVocoder from "./PhaseVocoder/base";
import Quantizer from "./Quantizer/base";
import Scale from "./Scale/base";
import Select from "./Select/base";
import Slider from "./Slider/base";
import Spectroscope from "./Spectroscope/base";
import Sticker from "./Sticker/base";
import ValueMeter from "./ValueMeter/base";
import MidiToFrequency from "./MidiToFrequency/base";
import WhiteNoise from "./WhiteNoise/base";
import AudioTrack from "./AudioTrack/base";
import Clock from "./Clock/base";
import DataRecorder from "./DataRecorder/base";
import MidiInput from "./MidiInput/base";
import RandomSequencer from "./RandomSequencer/base";
import Sequencer from "./Sequencer/base";
import VirtualKeyboard from "./VirtualKeyboard/base";
import AudioRecorder from "./AudioRecorder/base";
import PassThrough from "./PassThrough/base";

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
    AudioInputPlugin,
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
};

export default webNoiseNodes;
