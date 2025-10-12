import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Dynamics Compressor",
  description: `
  An audio processor that reduces the volume of loud sounds and amplifies quiet sounds.

  Essential for creating professional-sounding mixes, preventing distortion,
  and making audio more consistent in volume.
  `,
  info: `
  # Dynamics Compressor

  Controls the dynamic range of audio signals by reducing the volume of loud parts
  and increasing the volume of quiet parts.

  Use it to control dynamic range, prevent clipping, and create a more balanced mix.

  ## Parameters
  - Threshold: Level at which compression begins (dB, typically -24 to 0)
  - Knee: How gradually compression is applied at the threshold (dB, typically 0 to 40)
  - Ratio: Amount of compression applied (ratio, typically 1 to 20)
  - Attack: How quickly compression is applied (seconds, typically 0 to 1)
  - Release: How quickly compression is released (seconds, typically 0 to 1)
  `,
  tags: ["compressor", "dynamics", "level", "mixing", "mastering"],
  portsDescription: {
    inputs: {
      input: "Audio input to be compressed",
      threshold: "Level at which compression begins (dB)",
      knee: "Smoothness of the compression curve at the threshold (dB)",
      ratio: "Amount of compression applied (ratio)",
      attack: "Time to apply compression (seconds)",
      release: "Time to release compression (seconds)",
    },
    outputs: {
      output: "Compressed audio output",
    },
  },
};

export default plugin;
