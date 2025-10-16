import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./RandomSequencer";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  defaultConfig: {},
  name: "Random Sequencer (MIDI Note Generator)",
  description:
    "Generates random MIDI notes from a pentatonic scale when triggered. Creates generative musical sequences for algorithmic composition and experimental sound design by outputting note numbers that control pitch-based audio processors.",
  info: `# Random Sequencer (MIDI Note Generator)

A trigger-driven random note generator that outputs MIDI note numbers from a predefined musical scale. The sequencer creates generative melodic patterns by selecting random notes when triggered, enabling algorithmic composition and unpredictable musical sequences.

## Purpose

- Generate random melodic sequences for algorithmic composition
- Create generative music patterns that evolve over time
- Produce unpredictable note sequences for experimental music
- Add controlled randomness to modular synthesis patches
- Drive pitch parameters of oscillators and samplers with random values
`,
  tags: [
    "sequencer",
    "random",
    "midi",
    "generator",
    "algorithmic",
    "generative",
  ],
  portsDescription: {
    inputs: {
      trigger:
        "Gate signal that triggers a new random note when crossing threshold (0.5)",
    },
    outputs: {
      midi: "MIDI note number output (45-93) from pentatonic scale, held until next trigger",
    },
  },
};

export default plugin;
