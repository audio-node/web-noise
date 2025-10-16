import type { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Inlet (Patch Input)",
  description: "Patch boundary component that creates an input port for encapsulated patches. Defines where external signals enter a subpatch, enabling modular patch design and reusable audio processing modules.",
  info: `# Inlet (Patch Input)

A patch boundary component that creates input ports for encapsulated audio patches. Inlet nodes mark where signals from parent patches enter subpatches, enabling modular and hierarchical patch architecture.

## Purpose

- Define input ports for reusable patch modules
- Create boundaries for encapsulated signal processing chains
- Enable modular patch design with clear input contracts
- Allow complex patches to be packaged as reusable components
- Organize large projects with hierarchical patch structures


Inlet nodes work in conjunction with Outlet nodes to create complete input/output interfaces for subpatches and modules.`,
  tags: ["patch", "modular", "input", "boundary", "routing", "subpatch"],
  portsDescription: {
    inputs: {
      in: "Input port receiving signals from parent patch context"
    },
    outputs: {
      out: "Output port forwarding signals to nodes within the patch"
    }
  }
};

export default plugin;
