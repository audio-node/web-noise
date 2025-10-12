import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Delay (Time Shifter)",
  description: `
  A time-based effect that delays the audio signal by a specified amount of time.

  Essential for creating echo effects, comb filtering, and when combined with feedback,
  can produce reverb-like effects and complex modulations.
  `,
  info: `
  # Delay

  Creates a delayed copy of the incoming audio signal.

  Use it to create echoes, reverb effects, or time-based modulation when combined with feedback.
  `,
  tags: ["delay", "effect"],
  portsDescription: {
    inputs: {
      input: "Audio input to be delayed",
      time: "Delay time in seconds",
    },
    outputs: {
      output: "Delayed audio output",
    },
  },
};

export default plugin;
