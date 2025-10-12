import { PluginComponent } from "@web-noise/core";
import Convolver from "./Convolver";
import node from "./Node";
import base from "./base";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Convolver,
  node,
  configNode,
  resizable: true,
  defaultConfig: {
    size: { width: 220, height: 65 },
  },
  name: "Convolver (Reverb/Space)",
  description: `
  An effect that applies the acoustic characteristics of a space to audio signals.

  Essential for adding depth, space, and realism to audio by simulating real acoustic environments
  like concert halls, rooms, or other spaces with distinctive sonic characteristics.
  `,
  info: `
  # Convolver

  Applies convolution effects to audio, creating realistic reverb and spatial processing.

  Use it to create realistic reverb, echo, or spatial effects using impulse response samples.

  ## Usage
  - Load an impulse response file (WAV/MP3)
  - Impulse responses capture the acoustic "signature" of real spaces
  - Higher quality impulse responses create more realistic effects
  - Commonly used for reverb, but can create many other effects
  `,
  tags: ["convolver", "reverb", "space", "effect", "impulse response"],
  portsDescription: {
    inputs: {
      input: "Audio input to be processed with convolution",
    },
    outputs: {
      output: "Processed audio with applied convolution effect",
    },
  },
};

export default plugin;
