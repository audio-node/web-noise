import type { PluginComponent } from "@web-noise/core";
import Patch from "./Patch";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node: Patch,
  name: "Patch (Subpatch Container)",
  description: "Container component that loads and embeds patches as reusable modules. Enables modular patch design by encapsulating complex signal processing graphs that can be saved and reused across projects with dynamic inputs and outputs.",
  info: `# Patch (Subpatch Container)

A container component that loads and embeds other patches as reusable modules within a parent patch. The Patch node enables hierarchical patch architecture where complex processing chains can be encapsulated and reused.

## Purpose

- Load and embed saved patches as reusable modules
- Create hierarchical patch architectures with nested subpatches
- Encapsulate complex signal processing chains as black-box components
- Enable modular patch design with reusable components
- Share and reuse patches across projects and collaborations

## Values

- **URL/Patch Data**: Source of the patch to load, either as a project reference (project://patch-id), external URL, or direct patch data. The loaded patch contains nodes, connections, and configuration.

The Patch node treats subpatches as self-contained modules with clearly defined external interfaces.`,
  tags: ["patch", "modular", "container", "subpatch", "encapsulation", "reusable"],
  portsDescription: {
    inputs: {
      // Dynamic inputs based on Inlet nodes in loaded patch
    },
    outputs: {
      // Dynamic outputs based on Outlet nodes in loaded patch
    }
  }
};

export default plugin;
