import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Phase Vocoder (Pitch Shifter)",
  description:
    "Real-time pitch-shifting effect that changes the pitch of audio signals without altering their duration.",
  info: `# Phase Vocoder (Pitch Shifter)

A real-time pitch-shifting processor that transforms audio pitch while preserving timing. The phase vocoder uses spectral analysis to shift frequency components, enabling musical pitch effects without time stretching.

## Purpose

- Shift pitch up or down without changing audio duration
- Create harmony effects by layering pitch-shifted signals
- Transpose musical performances in real-time
- Design unique vocal and instrumental effects
- Correct pitch in recordings while maintaining natural timing
`,
  tags: ["pitch", "vocoder", "effect", "frequency", "spectral", "synthesis"],
  portsDescription: {
    inputs: {
      input: "Audio signal to be pitch-shifted",
      pitch:
        "Pitch shift factor (multiplier), where 1.0 = no change, 2.0 = one octave up, 0.5 = one octave down.  Values like 1.5 create musical intervals (e.g., perfect fifth). Higher values shift pitch upward, lower values shift pitch downward.",
    },
    outputs: {
      output: "Pitch-shifted audio signal with preserved duration",
    },
  },
};

export default plugin;

