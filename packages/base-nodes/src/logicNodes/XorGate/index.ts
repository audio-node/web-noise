import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "XOR Gate",
  description:
    "Logical XOR gate that outputs 1 when inputs differ. Outputs 1 when exactly one input is 1, and 0 when both inputs are the same. Essential for creating difference detection, toggle logic, and complex rhythmic patterns in modular synthesis.",
  info: `# XOR Gate

A logical XOR (exclusive OR) gate that outputs true (1) when inputs are different. The output is true (1) when exactly one input is true (1), and false (0) when both inputs are the same (both 0 or both 1). XOR gates are fundamental for detecting changes, creating toggle behaviors, and generating complex rhythmic variations.

## Purpose

- Detect differences between two gate signals
- Create alternating or toggle patterns from triggers
- Generate complex rhythmic variations by comparing sequences
- Implement change detection logic
- Build half-adder circuits for computational synthesis
`,
  tags: ["logic", "gate", "xor", "boolean", "exclusive"],
  portsDescription: {
    inputs: {
      A: "First binary input signal (0 or 1)",
      B: "Second binary input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (1 when inputs differ, 0 when inputs are the same)",
    },
  },
};

export default plugin;
