import { PluginComponent } from "@web-noise/core";
import Destination from "./Destination";
import node from "./Node";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: Destination,
  node,
  name: "Destination (Speaker)",
  description:
    "The final audio processing or rendering destination (usually the speakers)",
  info: `# Destination

A node that represents the final audio processing or rendering destination in the Web Audio API, typically your system's speakers or headphones.

## Purpose

- Serve as the final destination for all audio processing chains
- Connect audio sources to the system's audio output hardware
- Automatically handle audio routing to the default playback device
- Provide the endpoint for all audio graph processing

## Usage Notes

- This is typically the final node in any Web Audio processing chain
- All audio that should be heard must eventually connect to this node
- The destination automatically handles sample rate conversion if needed
- Audio context must be resumed (often requires user interaction) before audio will play
- This node uses the system's default audio output device`,
  tags: ["output", "speakers", "playback", "destination", "audio-api"],
  portsDescription: {
    inputs: {
      in: "Audio input that receives signals to be routed to the audio destination (speakers/headphones)",
    },
  },
};

export default plugin;
