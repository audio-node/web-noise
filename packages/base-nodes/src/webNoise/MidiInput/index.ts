import { PluginComponent } from "@web-noise/core";
import base from "./base";
import MidiInput from "./MidiInput";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: MidiInput,
  name: "MIDI Input",
  description:
    "Receives messages from a connected hardware MIDI device. Outputs command, note, and velocity signals.",
  info: `# MIDI Input

Connects to a hardware MIDI device and translates incoming messages into signals. This node is the bridge between your physical MIDI controllers and the Web Noise environment.

## Purpose

- Play instruments with a MIDI keyboard
- Control parameters with MIDI knobs and faders
- Trigger events from MIDI drum pads
`,
  tags: ["midi", "input", "controller", "hardware", "keyboard", "control"],
  portsDescription: {
    inputs: {},
    outputs: {
      command: "The MIDI status byte (144 for Note On, 224 for Pitch Bend).",
      note: "The first data byte ( MIDI note number).",
      velocity: "The second data byte (note velocity).",
    },
  },
};

export default plugin;
