import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "AND Gate",
  description:
    "Logical AND gate that outputs 1 only when all inputs are 1. Essential for combining multiple trigger conditions, creating complex gate patterns, and implementing conditional logic in modular synthesis.",
  info: `# AND Gate

A logical AND gate that performs boolean multiplication on its inputs. The output is true (1) only when all inputs are true (1). If any input is false (0), the output becomes false (0). This fundamental logic operation is crucial for combining multiple control signals and creating complex triggering conditions.

## Purpose

- Combine multiple gate or trigger signals
- Create conditional triggers that require multiple conditions
- Implement complex rhythmic patterns by gating sequences
- Build logic circuits for generative music systems
- Synchronize multiple control signals
`,
  tags: ["logic", "gate", "and", "boolean", "conjunction"],
  portsDescription: {
    inputs: {
      A: "First binary input signal (0 or 1)",
      B: "Second binary input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (1 only when both inputs are 1, otherwise 0)",
    },
  },
};

export default plugin;
