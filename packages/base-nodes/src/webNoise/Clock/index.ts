import { PluginComponent } from "@web-noise/core";
import base from "./base";
import { WNNode as node } from "@web-noise/core";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Clock",
  description: "Generates a rhythmic trigger signal at a specified tempo (BPM). Essential for sequencing and synchronization.",
  info: `# Clock

A tempo-based trigger generator. The Clock node is the heart of any rhythmic patch, providing a steady pulse for sequencers, drum machines, and other time-based modules.

## Purpose

- Drive sequencers and rhythmic generators
- Synchronize multiple parts of a patch
- Create time-based musical events

## Values

- **BPM**: Beats Per Minute. Controls the speed of the clock.
- **Duty**: The pulse width of the output signal (0-0.99). A duty of 0.5 creates a square wave.`,
  tags: ["clock", "tempo", "bpm", "trigger", "sequencer", "rhythm"],
  portsDescription: {
    inputs: {
      bpm: "The tempo in beats per minute.",
      duty: "The pulse width of the output signal (0-0.99).",
    },
    outputs: {
      trigger: "A trigger signal that fires at the specified BPM.",
    },
  },
};

export default plugin;
