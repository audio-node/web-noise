import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "NOR Gate",
  description:
    "Logical NOR gate that outputs 1 only when all inputs are 0. Outputs 0 when at least one input is 1. A universal logic gate that can be used to construct any other logic gate, essential for inverted inclusive logic in modular synthesis.",
  info: `# NOR Gate

A logical NOR (NOT-OR) gate that inverts the output of an OR gate. The output is true (1) only when all inputs are false (0). If any input is true (1), the output becomes false (0). NOR gates are considered universal gates because any other logic gate can be constructed using only NOR gates.

## Purpose

- Create inverted merged trigger signals
- Build complex logic circuits (NOR is universal)
- Generate complementary gate patterns from multiple inputs
- Implement "neither/nor" logic conditions
- Construct other logic gates (NOT, AND, OR, NAND, XOR) from NOR gates
`,
  tags: ["logic", "gate", "nor", "boolean"],
  portsDescription: {
    inputs: {
      A: "First binary input signal (0 or 1)",
      B: "Second binary input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (1 only when both inputs are 0, otherwise 0)",
    },
  },
};

export default plugin;
