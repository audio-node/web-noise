import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Channel Merger",
  description: `
  A utility node that combines multiple mono audio channels into a single multi-channel stream.

  Essential for creating stereo or surround sound from separate mono sources,
  spatial audio processing, and managing complex channel configurations.
  `,
  info: `
  # Channel Merger

  Combines multiple mono inputs into a single multi-channel output.

  Use it to create stereo or surround sound from separate mono sources.

  ## Usage
  - Connect mono sources to different input channels
  - Each input becomes a separate channel in the output
  - Typically used with Channel Splitter for channel manipulation
  `,
  tags: ["merger", "channels", "stereo", "multichannel"],
  portsDescription: {
    inputs: {
      input0: "First channel input (becomes left in stereo)",
      input1: "Second channel input (becomes right in stereo)",
      // Additional inputs would follow the same pattern
    },
    outputs: {
      output: "Multi-channel output containing all merged inputs",
    },
  },
};

export default plugin;
