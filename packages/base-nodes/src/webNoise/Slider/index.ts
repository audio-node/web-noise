import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Slider from "./Slider";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Slider,
  node,
  configNode,
  defaultConfig,
  minSize: { height: 120, width: 120 },
  resizable: true,
  name: "Slider (Control Value)",
  description:
    "User-controlled constant value generator with adjustable output. Provides manual control over parameter values through a slider interface, with support for external modulation of the offset parameter for dynamic value changes.",
  info: `# Slider (Control Value)

A user-controlled constant value generator that outputs adjustable signals through a slider interface. The slider provides intuitive manual control over parameter values while supporting external modulation through its offset input.

## Purpose

- Provide manual control over audio parameters like frequency, gain, or filter cutoff
- Create static control voltages with user-adjustable levels
- Serve as a base value that can be modulated by LFOs or envelopes
- Automate parameters through UI interaction
- Generate constant signals for testing and calibration

## Values

The current slider position that determines the base output level. Can be adjusted through the UI or set programmatically. The range is typically configured (default 0-1), but the actual output can exceed this range through modulation.

## Configuration

Adjustable parameters include minimum value (default: 0), maximum value (default: 1), step size (default: 0.1), orientation (horizontal/vertical), visual scale display, and color customization.
`,
  tags: ["utility", "control", "slider", "constant", "modulation", "input"],
  portsDescription: {
    inputs: {
      offset:
        "AudioParam accepting modulation sources, added to the base slider value",
    },
    outputs: {
      output:
        "Constant signal output with current slider value plus any offset modulation",
    },
  },
};

export default plugin;
