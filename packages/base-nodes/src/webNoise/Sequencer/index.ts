import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Sequencer from "./Sequencer";
import node from "./Node";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: Sequencer,
  configNode,
  defaultConfig: {
    color: "#007bff",
    size: { height: 80, width: 100 },
  },
  resizable: true,
  name: "Step Sequencer",
  description:
    "A clock-driven step sequencer. Plays back programmable sequences of notes or gates when triggered. Creates rhythmic patterns and melodic sequences for electronic music production by outputting gate states or MIDI notes",
  info: `# Sequencer (Step Sequencer)

A clock-driven step sequencer that plays back user-defined patterns of notes and gates. The sequencer advances through a sequence of steps in response to clock signals, making it essential for creating rhythmic patterns, drum sequences, and melodic loops.

## Purpose

- Create rhythmic gate patterns for triggering envelopes and drums
- Program melodic sequences and bass lines
- Generate synchronized patterns for modular synthesis
- Build complex polyrhythmic compositions
- Design evolving sequences with programmable note and gate combinations
`,
  tags: ["sequencer", "pattern", "rhythm", "melody", "midi", "clock", "step"],
  portsDescription: {
    inputs: {
      gate: "Clock signal that advances to next step on rising edge (threshold: 0.5)",
      reset:
        "Trigger signal that resets sequencer to beginning (threshold: 0.5)",
    },
    outputs: {
      gate: "Gate output mirroring clock when step gate is 1, or 0 for rests",
      note: "MIDI note number from current step (0-127)",
      index: "Current step index in sequence (0-based)",
    },
  },
};

export default plugin;
