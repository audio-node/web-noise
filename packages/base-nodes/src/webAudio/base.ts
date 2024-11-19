import type { PluginConfig } from "@web-noise/core";
import Gain from "./Gain/base";
import Destination from "./Destination/base";
import ChannelMerger from "./ChannelMerger/base";
import ChannelSplitter from "./ChannelSplitter/base";
import Convolver from "./Convolver/base";
import Delay from "./Delay/base";
import DynamicsCompressor from "./DynamicsCompressor/base";
import Filter from "./Filter/base";
import Oscillator from "./Oscillator/base";
import ParameterComponent from "./Parameter/base";
import StereoPanner from "./StereoPanner/base";
import WaveShaper from "./WaveShaper/base";

const webAudioNodes: PluginConfig = {
  components: [
    Destination,
    Gain,
    Filter,
    ParameterComponent,
    Oscillator,
    StereoPanner,
    Delay,
    DynamicsCompressor,
    Convolver,
    WaveShaper,
    ChannelSplitter,
    ChannelMerger,
  ],
  name: "Web Audio Api base nodes",
};

export default webAudioNodes;
