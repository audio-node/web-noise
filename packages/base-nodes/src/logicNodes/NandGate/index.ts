import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "NAND Gate",
  description:
    "Logical NAND gate that outputs 0 only when all inputs are 1. Outputs 1 in all other cases. A universal logic gate that can be used to construct any other logic gate, essential for complex boolean operations in modular synthesis.",
  info: `# NAND Gate

A logical NAND (NOT-AND) gate that inverts the output of an AND gate. The output is false (0) only when all inputs are true (1). In all other cases, the output is true (1). NAND gates are considered universal gates because any other logic gate can be constructed using only NAND gates.

## Purpose

- Create inverted conditional triggers
- Build complex logic circuits (NAND is universal)
- Generate complementary gate patterns from combined inputs
- Implement "not both" logic conditions
- Construct other logic gates (NOT, AND, OR, NOR, XOR) from NAND gates
`,
  tags: ["logic", "gate", "nand", "boolean"],
  portsDescription: {
    inputs: {
      A: "First binary input signal (0 or 1)",
      B: "Second binary input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (0 only when both inputs are 1, otherwise 1)",
    },
  },
};

export default plugin;
