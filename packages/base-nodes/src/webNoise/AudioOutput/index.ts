import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioOutput from "./AudioOutput";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  controlPanelNode: AudioOutput,
  node,
  name: "Audio Output (Speakers)",
  description:
    "Routes audio to speakers, headphones, and other output devices connected to your system.",
  info: `# Audio Output

A node that routes audio to speakers, headphones, and other output devices connected to your system.

## Purpose

- Route audio to specific output devices like speakers or headphones
- Select between multiple audio outputs for different monitoring scenarios
- Create multi-channel audio systems with different outputs
- Test audio on different devices without changing system settings

## Usage Notes

- Browser security may require user interaction before audio output selection can be used
- Some browsers may have limited support for the Audio Output Devices API
- Default output refers to the system's current default audio device
- For best results, ensure your browser has permission to access audio devices
- Device selection is maintained across audio context suspensions`,
  tags: ["output", "speakers", "playback", "destination"],
  portsDescription: {
    inputs: {
      input:
        "Audio input that receives signals to be routed to the selected output device",
    },
  },
};

export default plugin;

