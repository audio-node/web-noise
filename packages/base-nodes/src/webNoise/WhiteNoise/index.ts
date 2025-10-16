import { type PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "White Noise  Generator",
  description:
    "Random noise generator producing white noise with equal energy across all frequencies. Essential for creating percussion sounds, synthesizer textures, wind/ocean effects, and as a modulation source for unpredictable sonic variations.",
  info: `# White Noise Generator

A continuous random noise generator that produces white noise—a signal with equal energy distribution across all frequencies. White noise is a fundamental building block in sound synthesis and design, providing raw sonic material for creating various textures and effects.

## Purpose

- Generate raw noise for percussion sounds (snares, hi-hats, cymbals)
- Create wind, ocean, and atmospheric sound effects
- Provide texture and air in synthesizer patches
- Serve as a random modulation source for parameters
- Test audio systems and analyze frequency response


White noise can be filtered to create different colored noises: low-pass filtering creates darker, bass-heavy noise; high-pass filtering creates brighter, thinner noise; band-pass filtering creates focused noise bands useful for specific timbral effects.`,
  tags: ["noise", "generator", "source", "white", "random", "synthesis"],
  portsDescription: {
    inputs: {},
    outputs: {
      out: "White noise audio signal (-1 to 1) with equal energy across all frequencies",
    },
  },
};

export default plugin;
