import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Stereo Panner (Spatial Positioning)",
  description: `
  A spatial audio processor that positions sounds in the stereo field from left to right.
  
  Perfect for creating spatial effects, stereo imaging, and adding movement to sounds.
  `,
  info: `
  # StereoPanner
  
  Positions audio signals in the stereo field between left and right channels.
  
  Use it to create immersive stereo mixes, add movement to sounds, or separate elements

  in your audio projects.
  ## Values
  - -1.0: Full left positioning
  - 0.0: Center positioning (equal in both channels)
  - 1.0: Full right positioning
  
  The panner uses equal-power panning to maintain consistent perceived volume across the stereo field.
  `,
  tags: ["panner", "stereo", "spatial", "positioning", "balance"],
  portsDescription: {
    inputs: {
      input: "Audio signal to be positioned in the stereo field",
      pan: "Pan position value between -1 (full left) and 1 (full right)",
    },
    outputs: {
      output: "Panned audio output",
    },
  },
};

export default plugin;
