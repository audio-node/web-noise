import { PluginComponent, WNNode } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node: WNNode,
  name: "Frequency Meter",
  description:
    "Analyzes an audio signal to detect and output its fundamental frequency. Useful for tuning or frequency-driven effects.",
  info: `# Frequency Meter

A pitch detection node that analyzes an audio signal and outputs its fundamental frequency in Hertz (Hz).

## Purpose

- Tune instruments or oscillators
- Create frequency-reactive visuals or effects
- Analyze the pitch of a sound source
`,
  tags: ["frequency", "tuner", "analysis", "utility", "meter"],
  portsDescription: {
    inputs: {
      input: "The audio signal to be analyzed.",
      method: `Selects the pitch detection algorithm.

        Options
        - 0 - default
        - 1 - yin
        - 2 - mcomb 
        - 3 - schmitt
        - 4 - fcomb 
        - 5 - yinfft
        - 6 - yinfast
        - 7 - specacf
        `,
      fftSize: "The FFT buffer size for analysis.",
      hopSize: "The hop size (analysis interval).",
    },
    outputs: {
      frequency: "The detected frequency in Hz.",
    },
  },
};

export default plugin;

