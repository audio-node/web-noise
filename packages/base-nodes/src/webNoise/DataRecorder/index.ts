import { PluginComponent } from "@web-noise/core";
import base from "./base";
import DataRecorder from "./DataRecorder";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: DataRecorder,
  name: "Data Recorder",
  description:
    "Records raw numerical data from up to two inputs into a downloadable JSON file. Useful for capturing control signals or debugging.",
  info: `# Data Recorder

A utility node for capturing streams of numerical data. Unlike an audio recorder, this node records the raw values from its inputs, making it ideal for logging control signals, analyzing data patterns, or debugging complex patches.

## Purpose

- Record and analyze control voltage (CV) or modulation signals
- Debug data streams within a patch
- Export data for use in external applications or visualizations
`,
  tags: ["data", "recorder", "utility", "cv", "debugging", "logging"],
  portsDescription: {
    inputs: {
      gate: "Gate signal to start (>=0.5) and stop (<0.5) recording.",
      "0": "The first data stream to record.",
      "1": "The second data stream to record.",
    },
    outputs: {},
  },
};

export default plugin;
