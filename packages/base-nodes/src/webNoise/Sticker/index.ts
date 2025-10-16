import { PluginComponent } from "@web-noise/core";
import base from "./base";
import Sticker from "./Sticker";
import node from "./Node";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Sticker,
  node,
  defaultConfig,
  name: "Sticker (Text Annotation)",
  description:
    "Visual annotation component for displaying Markdown-formatted text notes. Used for documenting patches, labeling signal flows, explaining parameters, and adding instructional content without any audio processing functionality.",
  info: `# Sticker (Text Annotation)

A pure interface component for adding visual annotations and documentation to audio patches. The sticker displays Markdown-formatted text with customizable styling, enabling clear communication of patch design, parameter settings, and usage instructions.

## Purpose

- Document complex signal flows and routing
- Add explanatory notes to patches and presets
- Label sections and groups of related nodes
- Create tutorials and instructional content
- Provide reminders about parameter ranges and settings

The sticker is a visual-only component with no audio inputs or outputs. It exists purely for documentation and annotation purposes.`,
  tags: [
    "documentation",
    "annotation",
    "text",
    "label",
    "interface",
    "markdown",
  ],
  portsDescription: {
    inputs: {},
    outputs: {},
  },
};

export default plugin;

