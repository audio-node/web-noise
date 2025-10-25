import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "NIMPLY Gate",
  description:
    "Logical non-implication gate that outputs 1 only when A is 1 and B is 0. Implements the negation of 'A implies B', outputting 1 only when the premise is true and conclusion is false. Essential for detecting failed implications, inhibit logic, and conditional suppression in modular synthesis.",
  info: `# NIMPLY Gate

A logical non-implication gate that implements the negation of material implication ¬(A → B), which is equivalent to A ∧ ¬B. The output is true (1) only when A is true (1) and B is false (0). In all other cases, the output is false (0). This gate represents when an implication fails and is useful for inhibit logic and conditional blocking.

## Purpose

- Detect when implications fail (A is true but B is false)
- Implement inhibit logic where A suppresses output unless B is false
- Create conditional blocking and gating patterns
- Build exception detection circuits
- Generate asymmetric gate patterns for advanced sequencing
`,
  tags: ["logic", "gate", "nimply", "boolean", "non-implication"],
  portsDescription: {
    inputs: {
      A: "Premise input signal (0 or 1)",
      B: "Inhibit input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (1 only when A=1 and B=0, otherwise 0)",
    },
  },
};

export default plugin;
