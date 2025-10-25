import { PluginComponent, WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "NOT Gate",
  description:
    "Logical NOT gate that inverts binary signals. Outputs 1 when input is 0, and 0 when input is 1. Essential for logic inversion, signal negation, and creating complementary control signals in modular synthesis.",
  info: `# NOT Gate

A logical NOT gate (inverter) that flips the binary state of the input signal. When the input is true (1), the output becomes false (0), and vice versa. This fundamental logic operation is crucial for creating inverse control signals and building complex logic circuits.

## Purpose

- Invert gate or trigger signals
- Create complementary control signals
- Negate boolean conditions in logic chains
- Generate opposite-phase control voltages
- Build complex logic operations from basic gates
`,
  tags: ["logic", "gate", "not", "inverter", "boolean"],
  portsDescription: {
    inputs: {
      A: "Binary input signal to be inverted (0 or 1)",
    },
    outputs: {
      Q: "Inverted output signal (1 if input is 0, 0 if input is 1)",
    },
  },
};

export default plugin;
