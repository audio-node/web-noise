import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./MathNode";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  name: "Math Expression",
  description:
    "Evaluates a user-defined math expression with multiple inputs. Enables complex custom signal processing and logic.",
  info: `# Math Expression

A powerful node that processes signals using a custom math expression. It provides several inputs that can be used as variables in your code.

## Purpose

- Perform complex mathematical operations on signals
- Create custom mixers, crossfaders, or logic gates
- Implement custom synthesis or effect algorithms

## Variables
- Standard JavaScript \`Math\` object functions are available (e.g., \`Math.sin()\`, \`Math.max()\`).

## Example

\`(A * X) + (B * (1 - X))\`
This expression crossfades between signals A and B using X as the control.`,
  tags: ["math", "expression", "scripting", "logic", "utility", "processor"],
  portsDescription: {
    inputs: {
      A: "Audio-rate input 'A'.",
      B: "Audio-rate input 'B'.",
      C: "Audio-rate input 'C'.",
      X: "Control-rate input 'X'.",
      Y: "Control-rate input 'Y'.",
      Z: "Control-rate input 'Z'.",
      INPUT: "Main audio-rate input.",
    },
    outputs: {
      out: "The result of the evaluated expression.",
    },
  },
};

export default plugin;
