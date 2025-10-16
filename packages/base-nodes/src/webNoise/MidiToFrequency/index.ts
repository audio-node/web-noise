import { PluginComponent } from "@web-noise/core";
import base from "./base";
import { WNNode as node } from "@web-noise/core";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "MIDI to Frequency Converter",
  description:
    "Converts MIDI note numbers to their corresponding frequencies in Hertz (Hz). Essential for pitch control from MIDI sources.",
  info: `# MIDI to Frequency

Translates MIDI note numbers (0-127) into audible frequencies (Hz). This node is fundamental for using MIDI pitch information to control oscillators and other frequency-modulated modules.

## Purpose

- Drive oscillators with MIDI keyboards or sequencers
- Create pitch-shifting effects based on MIDI input
- Ensure accurate tuning from MIDI sources

## Inputs

- **MIDI**: The MIDI note number. Standard MIDI notes range from 0 to 127.
- **Tune**: An optional base frequency in Hz. This allows you to adjust the reference pitch (e.g., A4 = 440 Hz). If not connected, it defaults to 440 Hz.`,
  tags: ["midi", "frequency", "pitch", "converter", "utility", "note"],
  portsDescription: {
    inputs: {
      midi: "The incoming MIDI note number (0-127).",
      tune: "Optional: Base frequency in Hz (defaults to 440 Hz).",
    },
    outputs: {
      out: "The calculated frequency in Hertz (Hz).",
    },
  },
};

export default plugin;
