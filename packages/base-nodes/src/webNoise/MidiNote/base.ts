import { PluginComponent } from "@web-noise/core";
import Select from "../Select/base";

const MidiNote: PluginComponent = {
  ...Select,
  type: "midiNote",
};

export default MidiNote;
