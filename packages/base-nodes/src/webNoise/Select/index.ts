import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./Select";
import node from "./SelectNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";
import base from "./base";

export const Select: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  configNode,
  defaultConfig,
  name: "Select (Value Selector)",
  description:
    "Outputs a constant signal based on user selection from configurable options. Provides discrete control values for switching between presets, selecting parameters, or generating static control voltages in modular synthesis.",
  info: `# Select

A user-controlled constant value generator that outputs numeric signals based on selection from a predefined list of options. The select node provides a simple interface for choosing between preset values, making it ideal for switching between different parameter settings.

## Purpose

- Switch between preset parameter values
- Select from predefined control voltage levels
- Implement parameter banks with labeled options
- Provide discrete value selection for modulation targets
- Create user-friendly interfaces for complex parameter mappings

## Values

- **Selection**: The currently active option key that determines the output value. When a selection is made, the node looks up the corresponding numeric value from the options list and outputs it as a constant signal.
`,
  tags: ["utility", "control", "selector", "constant", "preset", "switch"],
  portsDescription: {
    inputs: {},
    outputs: {
      out: "Constant signal output corresponding to the value of the currently selected option",
    },
  },
};

export default Select;
