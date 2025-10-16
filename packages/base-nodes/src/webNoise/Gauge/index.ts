import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Gauge from "./Gauge";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Gauge,
  node,
  configNode,
  defaultConfig,
  resizable: true,
  name: "Gauge (Radial Meter)",
  description:
    "Visualizes a numerical signal as a radial gauge meter. Provides a clear, analog-style display for various values.",
  info: `# Gauge

A graphical meter that displays a single numerical value on a radial gauge. It's perfect for getting a quick visual reading of a signal's level or state.

## Purpose

- Monitor signal levels (e.g., volume, modulation depth)
- Provide visual feedback for control signals
- Create dashboard-like interfaces

## Configuration

The appearance of the gauge, including its range (min/max), ticks, colors, and custom labels, can be extensively customized in the node's configuration panel.`,
  tags: ["gauge", "meter", "visualizer", "utility", "level", "display"],
  portsDescription: {
    inputs: {
      in: "The numerical signal to be displayed on the gauge.",
    },
    outputs: {},
  },
};

export default plugin;

