import { PluginComponent } from "@web-noise/core";
import base from "./base";
import VirtualKeyboard from "./VirtualKeyboard";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: VirtualKeyboard,
  configNode,
  defaultConfig,
  resizable: true,
  name: "Virtual Keyboard (MIDI Controller)",
  description:
    "Interactive MIDI controller interface that generates note-on and note-off commands through a keyboard display. Outputs MIDI command, note, and velocity signals for triggering synthesizers, samplers, and virtual instruments.",
  info: `# Virtual Keyboard (MIDI Controller)

An interactive MIDI controller that outputs note-on and note-off commands through a visual keyboard interface. The virtual keyboard provides an intuitive way to play musical notes and control MIDI-compatible sound generators.

## Purpose

- Play musical notes interactively through a visual keyboard interface
- Generate MIDI-style control signals for synthesizers and samplers
- Trigger note-based sound events with precise timing
- Create melodic sequences and musical performances
- Provide mouse/touch-based musical input for synthesis patches
`,
  tags: ["controller", "midi", "keyboard", "input", "trigger", "interface"],
  portsDescription: {
    inputs: {},
    outputs: {
      command: "MIDI command output: 144 for note-on, 128 for note-off",
      note: "MIDI note number (0-127), where 60 is Middle C",
      velocity: "MIDI velocity value (currently fixed at 127)",
    },
  },
};

export default plugin;
