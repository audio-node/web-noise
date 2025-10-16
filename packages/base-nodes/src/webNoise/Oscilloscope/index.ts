import { type PluginComponent } from "@web-noise/core";
import Oscilloscope from "./Oscilloscope";
import node from "./Node";
import base from "./base";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Oscilloscope,
  node,
  configNode,
  defaultConfig,
  resizable: true,
  name: "Oscilloscope (Visualizer)",
  description:
    "Visualizes the waveform of up to two audio signals in real-time. Essential for signal analysis and debugging.",
  info: `# Oscilloscope

A real-time waveform visualizer. The Oscilloscope plots an audio signal's amplitude over time, revealing its shape, frequency, and dynamic range. It can overlay two signals for comparison.

## Purpose

- Analyze the shape of a waveform (e.g., sine, square, sawtooth)
- Debug audio signals and identify issues like clipping
- Compare the input and output of an effect
- Visualize modulation and LFOs

## Configuration

The appearance, including colors, min/max display values, and a grid overlay, can be customized in the node's settings panel.`,
  tags: [
    "oscilloscope",
    "scope",
    "visualizer",
    "analysis",
    "waveform",
    "utility",
  ],
  portsDescription: {
    inputs: {
      input1: "The first audio signal to display.",
      input2: "The second audio signal to display.",
      fftSize: "The analysis window size (buffer size).",
    },
    outputs: {},
  },
};

export default plugin;
