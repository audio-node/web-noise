import type { PluginConfig } from "@web-noise/core";

import ChannelMerger from "./ChannelMerger";
import ChannelSplitter from "./ChannelSplitter";
import Convolver from "./Convolver";
import Delay from "./Delay";
import DynamicsCompressor from "./DynamicsCompressor";
import Filter from "./Filter";
import Oscillator from "./Oscillator";
import ParameterComponent from "./Parameter";
import StereoPanner from "./StereoPanner";
import WaveShaper from "./WaveShaper";
import Gain from "./Gain";
import Destination from "./Destination";

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
