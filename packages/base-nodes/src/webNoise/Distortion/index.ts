import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Distortion from "./Distortion";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Distortion,
  node,
  resizable: true,
  defaultConfig: {
    size: { width: 100, height: 100 },
  },
  name: "Distortion",
  description:
    "Alters the waveform of an input signal to create effects from subtle warmth to heavy fuzz. Uses a waveshaper with dynamically generated curves.",
  info: `# Distortion

A waveshaper-based distortion effect. It modifies the input signal's waveform according to a shaping curve, adding harmonics and saturation.

## Purpose

- Add warmth and character to sounds
- Create aggressive fuzz or overdrive effects
- Simulate analog saturation
`,
  tags: [
    "distortion",
    "effect",
    "waveshaper",
    "fuzz",
    "overdrive",
    "saturation",
  ],
  portsDescription: {
    inputs: {
      input: "The audio signal to be distorted.",
      drive: "Controls the intensity of the distortion.",
      type: `Selects the distortion algorithm.

        Options
        - 0 - Digital Clipper
        - 1 - Analog Warm
        - 2 - Fuzz`,
    },
    outputs: {
      output: "The distorted audio signal.",
    },
  },
};

export default plugin;
