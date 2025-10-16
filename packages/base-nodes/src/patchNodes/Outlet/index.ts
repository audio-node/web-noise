import type { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Outlet (Patch Output)",
  description:
    "Patch boundary component that creates an output port for encapsulated patches. Defines where internal signals exit a subpatch to the parent context, enabling modular patch design and reusable audio processing modules.",
  info: `# Outlet (Patch Output)

A patch boundary component that creates output ports for encapsulated audio patches. Outlet nodes mark where signals from within subpatches exit to parent patches, enabling modular and hierarchical patch architecture.

## Purpose

- Define output ports for reusable patch modules
- Create boundaries for encapsulated signal processing chains
- Enable modular patch design with clear output contracts
- Allow complex patches to be packaged as reusable components
- Organize large projects with hierarchical patch structures

Outlet nodes work in conjunction with Inlet nodes to create complete input/output interfaces for subpatches and modules.`,
  tags: ["patch", "modular", "output", "boundary", "routing", "subpatch"],
  portsDescription: {
    inputs: {
      in: "Input port receiving signals from nodes within the patch",
    },
    outputs: {
      out: "Output port forwarding signals to parent patch context",
    },
  },
};

export default plugin;
