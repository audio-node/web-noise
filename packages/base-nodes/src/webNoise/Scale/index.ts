import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Scale (Range Mapper)",
  description:
    "Maps input values from one range to another with linear interpolation. Essential for converting control signals between different parameter ranges, adapting modulation sources, and normalizing sensor or MIDI data for audio processing.",
  info: `# Scale (Range Mapper)

A linear range mapping utility that converts signals from an input range to an output range. The scale node clamps and interpolates values, making it essential for adapting control voltages and modulation signals in modular synthesis environments.

## Purpose

- Convert signals between different parameter ranges
- Adapt LFO or envelope outputs to control specific parameters
- Map MIDI values to audio-rate parameter ranges
- Normalize sensor data for audio processing
- Invert or flip signal ranges by swapping min/max values
`,
  tags: ["utility", "mapping", "scale", "range", "converter", "modulation"],
  portsDescription: {
    inputs: {
      in: "Input signal to be scaled from input range to output range",
      inMin:
        "Minimum boundary of input range. Values below this are clamped to this minimum.",
      inMax:
        "Maximum boundary of input range. Values above this are clamped to this maximum.",
      outMin:
        "Minimum value of output range. The scaled output will never go below this value.",
      outMax:
        "Maximum value of output range. The scaled output will never exceed this value.",
    },
    outputs: {
      out: "Scaled output signal linearly mapped to the output range with clamping",
    },
  },
};

export default plugin;

