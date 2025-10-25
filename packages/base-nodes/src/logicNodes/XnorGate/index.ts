import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "XNOR Gate",
  description:
    "Logical XNOR gate that outputs 1 when inputs are the same. Outputs 1 when both inputs are equal (both 0 or both 1), and 0 when inputs differ. Essential for creating equivalence detection, synchronization logic, and complementary patterns in modular synthesis.",
  info: `# XNOR Gate

A logical XNOR (exclusive NOR) gate that outputs true (1) when inputs are the same. The output is true (1) when both inputs are equal (both 0 or both 1), and false (0) when inputs differ. XNOR gates are fundamental for detecting equivalence, creating synchronized behaviors, and generating complementary rhythmic patterns.

## Purpose

- Detect equivalence between two gate signals
- Create synchronized or matching patterns from triggers
- Generate complementary rhythmic variations to XOR patterns
- Implement equivalence detection logic
- Build comparator circuits for computational synthesis
`,
  tags: ["logic", "gate", "xnor", "boolean", "biconditional"],
  portsDescription: {
    inputs: {
      A: "First binary input signal (0 or 1)",
      B: "Second binary input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (1 when inputs are the same, 0 when inputs differ)",
    },
  },
};

export default plugin;
