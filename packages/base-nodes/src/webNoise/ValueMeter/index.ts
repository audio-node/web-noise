import { PluginComponent } from "@web-noise/core";
import controlPanelNode from "./ValueMeter";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode,
  node,
  name: "Value (Digital) Meter",
  description:
    "Displays the instantaneous numerical value of an incoming signal. Ideal for monitoring control voltages and modulation.",
  info: `# Value Meter

A simple display that shows the current numerical value of an incoming signal. It's a fundamental tool for monitoring and debugging any data stream within your patch.

## Purpose

- Monitor control signals (e.g., LFOs, envelopes)
- Debug numerical outputs from other nodes
- Provide real-time feedback on parameter values
`,
  tags: ["meter", "value", "display", "utility", "monitor", "debug"],
  portsDescription: {
    inputs: {
      input: "The numerical signal to be displayed.",
    },
    outputs: {},
  },
};

export default plugin;
