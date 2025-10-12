import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Gain (Volume Control)",
  description: `
  A volume control node that amplifies or attenuates audio signals passing through it.
  Essential for mixing, creating volume envelopes, and balancing levels between
  different audio sources.
  `,
  info: `
  # Gain

  Controls the volume (amplitude) of audio signals.

  It causes a given gain to be applied to the input data before its propagation to the output
  `,
  tags: ["gain", "volume", "amplitude"],
  portsDescription: {
    inputs: {
      in: "Audio input to be processed",
      gain: `
      Control parameter for the gain (volume) level

      ## Values
      - 0: Silence (no sound)
      - 1: Unity gain (original volume)
      - <1: Attenuation (quieter)
      - >1: Amplification (louder)
      `,
    },
    outputs: {
      out: "Audio output with applied gain",
    },
  },
};

export default plugin;
