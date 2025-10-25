import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "OR Gate",
  description:
    "Logical OR gate that outputs 1 when at least one input is 1. Essential for combining multiple trigger sources, creating alternative gate patterns, and implementing inclusive logic conditions in modular synthesis.",
  info: `# OR Gate

A logical OR gate that performs boolean addition on its inputs. The output is true (1) when at least one input is true (1). The output is false (0) only when all inputs are false (0). This fundamental logic operation is crucial for merging multiple control signals and creating flexible triggering conditions.

## Purpose

- Merge multiple gate or trigger signals
- Create triggers from multiple alternative sources
- Implement inclusive logic conditions
- Build flexible routing for generative music systems
- Combine rhythmic patterns from different sequences
`,
  tags: ["logic", "gate", "or", "boolean", "disjunction"],
  portsDescription: {
    inputs: {
      A: "First binary input signal (0 or 1)",
      B: "Second binary input signal (0 or 1)",
    },
    outputs: {
      Q: "Output signal (1 when at least one input is 1, otherwise 0)",
    },
  },
};

export default plugin;
