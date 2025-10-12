import { PluginComponent } from "@web-noise/core";
import Filter from "./Filter";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Filter,
  node,
  name: "Filter",
  description: `
  A versatile audio filter that shapes frequency content by attenuating or emphasizing 
  specific frequency ranges. 
  
  Perfect for removing unwanted frequencies, creating EQ effects, and sound design applications.
  `,
  info: `
  # Filter (Audio Frequency Processor)
  
  Shapes the frequency content of audio signals by attenuating or emphasizing specific frequency ranges.

  Use it to create effects like low-pass, high-pass, band-pass, 
  and more for sound design and audio processing.
  
  ## Values
  - lowpass: Allows frequencies below cutoff point
  - highpass: Allows frequencies above cutoff point
  - bandpass: Allows frequencies within a range
  - notch: Removes frequencies within a range
  - allpass: Alters phase without changing amplitude
  - lowshelf: Boosts/cuts frequencies below cutoff
  - highshelf: Boosts/cuts frequencies above cutoff
  - peaking: Boosts/cuts frequencies around center point
  `,
  tags: ["filter", "eq", "frequency", "audio processor", "effects", "biquad"],
  portsDescription: {
    inputs: {
      in: "Audio signal to be filtered",
      frequency: "Cutoff or center frequency of the filter (in Hz)",
      detune: "Fine-tune adjustment of the frequency in cents",
      Q: "Q factor controlling the width/resonance of the filter",
      gain: "Gain amount for peaking and shelving filter types",
    },
    outputs: {
      out: "Filtered audio output",
    },
  },
};

export default plugin;
