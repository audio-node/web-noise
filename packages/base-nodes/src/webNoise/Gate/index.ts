import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./Gate";
import node from "./GateNode";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const Gate: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  configNode,
  defaultConfig,
  resizable: true,
  name: "Gate",
  description:
    "A manual gate control that outputs a high (1) or low (0) signal. Can be configured as a momentary button or a toggle switch.",
  info: `# Gate

A UI control that outputs a binary signal (0 or 1). It can function as a momentary trigger or a toggle switch, making it a fundamental tool for manual control and interaction.

## Purpose

- Manually trigger envelopes or sequencers
- Switch between different states in a patch
- Provide a simple on/off control for any parameter

## Values

The node's behavior (momentary vs. toggle) and appearance can be configured in its settings panel.`,
  tags: ["gate", "trigger", "control", "ui", "button", "switch"],
  portsDescription: {
    inputs: {},
    outputs: {
      out: "Outputs a signal of 1 when active and 0 when inactive.",
    },
  },
};

export default Gate;
