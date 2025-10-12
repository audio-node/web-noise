import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Channel Splitter",
  description: `
  A utility node that separates a multi-channel audio stream into individual mono channels.

  Essential for per-channel processing, applying different effects to left and right channels,
  or analyzing individual channels separately before recombining them.
  `,
  info: `
  # Channel Splitter

  Separates multi-channel audio into individual mono channels.

  Use it to process left and right channels separately or to extract specific channels from surround sound.

  ## Usage
  - Input a stereo or multi-channel signal
  - Each output provides a single channel from the input
  - Typically used with Channel Merger for channel manipulation
  `,
  tags: ["splitter", "channels", "stereo", "multichannel"],
  portsDescription: {
    inputs: {
      input: "Multi-channel audio input to be split",
    },
    outputs: {
      output0: "First channel output (left in stereo)",
      output1: "Second channel output (right in stereo)",
      // Additional outputs would follow the same pattern
    },
  },
};

export default plugin;
