import { PluginComponent } from "@web-noise/core";
import Oscillator from "./Oscillator";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Oscillator,
  node,
  name: "Oscillator (Waveform Generator)",
  description: `
  A sound generator that creates various waveforms (sine, square,
  sawtooth, triangle) at different frequencies. Use it as a basic
  building block for synthesizers, sound effects, and audio experiments
  `,
  info: `
  # Oscillator 

  Creates pure tones with adjustable waveform and frequency.

  Perfect for creating basic synth sounds, bass lines, and sound
  effects.

  ## Values
  - \`Sine\`: Smooth, pure tone
  - \`Square\`: Sharp, buzzy sound
  - \`Sawtooth\`: Bright, harsh tone
  - \`Triangle\`: Soft, hollow sound
  `,
  tags: ["oscillator", "sine", "generator", "audio source"],
  portsDescription: {
    inputs: {
      frequency: "Frequency (pitch) of the oscillator in Hertz (Hz)",
      detune: "Fine-tune of the frequency in cents (1/100th of a semitone)",
    },
    outputs: {
      out: "Audio output of the oscillator",
    },
  },
};

export default plugin;
