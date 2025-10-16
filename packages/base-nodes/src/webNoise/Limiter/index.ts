import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Limiter",
  description:
    "Prevents an audio signal from exceeding a hard-coded threshold, avoiding clipping. Ideal for mastering or bus processing.",
  info: `# Limiter

A peak limiter that prevents an audio signal from exceeding a specific level. It's a crucial tool for controlling dynamics and preventing distortion on a master bus or individual tracks.

## Purpose

- Prevent digital clipping and distortion
- Increase the overall loudness of a track (when used with makeup gain, not included)
- Protect speakers and listeners from sudden loud peaks

## Values

This limiter has a fixed internal threshold and release time. It does not expose any user-configurable parameters.`,
  tags: ["limiter", "dynamics", "effect", "mastering", "compressor", "peak"],
  portsDescription: {
    inputs: {
      input: "The audio signal to be limited.",
    },
    outputs: {
      output: "The limited audio signal.",
    },
  },
};

export default plugin;

