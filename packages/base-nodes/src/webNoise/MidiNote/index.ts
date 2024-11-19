import { PluginComponent } from "@web-noise/core";
import Select from "../Select";
import notes from "./notes";

const MidiNote: PluginComponent = {
  ...Select,
  type: "midiNote",
  defaultConfig: {
    placeholder: "Select note",
    options: notes,
  },
};

export default MidiNote;

