import { PluginComponent } from "@web-noise/core";
import Parameter from "./Parameter";
import ParameterNode from "./ParameterNode";
import base from "./base";
import configNode from "./Config";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Parameter,
  node: ParameterNode,
  configNode,
  name: "Parameter (Constant Value)",
  description: `
  A node that outputs a constant numerical value that can be adjusted manually.

  Essential for controlling various aspects of your audio graph, such as
  oscillator frequency, filter cutoff, gain levels, and more.
  `,
  info: `
  # Parameter

  Provides a constant value output that can be connected to audio parameters.
  Use it to control numeric audio parameters of other nodes like frequency, gain, etc.

  ## Values
  - Can be set to any numerical value
  - Configurable min/max range and step size
  - Can be modulated by connecting to the offset input
  `,
  tags: ["parameter", "constant", "control", "value"],
  portsDescription: {
    inputs: {
      offset: "Modulation input for the constant value",
    },
    outputs: {
      out: "Constant value output that can be connected to audio parameters",
    },
  },
};

export default plugin;
