import { PluginComponent } from "@web-noise/core";
import Select from "../Select";
import notes from "./notes";

const MidiNote: PluginComponent = {
  ...Select,
  type: "midiNote",
  name: "MIDI Note",
  description:
    "Outputs a constant MIDI note value (0-127) selected from a dropdown list of standard musical notes.",
  info: `# MIDI Note

A specialized version of the Select node, pre-configured with a list of MIDI notes. It provides a user-friendly way to select a specific pitch.

## Purpose

- Set a fixed pitch for an oscillator or synth
- Define notes in a sequence
- Transpose other signals by a specific musical interval

## Values

The dropdown contains a list of notes from A0 to G#9, which correspond to MIDI values 21 through 128.`,
  tags: ["midi", "note", "pitch", "control", "constant", "select"],
  portsDescription: {
    inputs: {},
    outputs: {
      out: "Outputs the selected MIDI note number as a constant signal.",
    },
  },
  defaultConfig: {
    placeholder: "Select note",
    options: notes,
  },
};

export default MidiNote;

