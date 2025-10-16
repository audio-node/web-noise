import type { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Pass Through",
  description:
    "A simple utility node that passes the input signal directly to the output without modification. Useful for organizing patch cables.",
  info: `# Pass Through

A utility node that simply passes any signal from its input directly to its output. It has no effect on the sound.

## Purpose

- Organize complex patches by routing signals through a clear point.
- Create multiple connection points from a single source by chaining Pass Through nodes.
- Act as a placeholder or debugging point in a signal chain.`,
  tags: ["utility", "routing", "passthrough", "organization"],
  portsDescription: {
    inputs: {
      in: "The signal to be passed through.",
    },
    outputs: {
      out: "The unmodified output signal.",
    },
  },
};

export default plugin;
