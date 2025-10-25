import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "IMPLY Gate",
  description:
    "Logical implication gate that outputs 0 only when A is 1 and B is 0. Implements the logic 'A implies B' (A → B), outputting 1 unless the premise is true and conclusion is false. Essential for conditional logic, causality chains, and sequential triggering in modular synthesis.",
  info: `# IMPLY Gate

A logical implication gate that implements material implication (A → B). The output is false (0) only when A is true (1) and B is false (0). In all other cases, the output is true (1). This gate represents the logical statement "if A, then B" and is fundamental for building conditional logic and causal relationships.

## Purpose

- Implement conditional logic and "if-then" relationships
- Create causality chains where one event implies another
- Build sequential triggering patterns
- Implement logical reasoning circuits
- Generate asymmetric gate patterns based on precedence
`,
  tags: ["logic", "gate", "imply", "boolean", "implication"],
  portsDescription: {
    inputs: {
      A: "Premise input signal (0 or 1)",
      B: "Conclusion input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (0 only when A=1 and B=0, otherwise 1)",
    },
  },
};

export default plugin;
