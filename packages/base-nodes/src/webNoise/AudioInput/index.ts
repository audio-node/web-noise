import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioInput from "./AudioInput";
import node from "./Node";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: AudioInput,
  name: "Audio Input (Microphone)",
  description:
    "Captures audio from microphones and other input devices connected to your system..",
  info: `# Audio Input

A node that captures audio from microphones and other input devices connected to your system.

## Purpose

- Capture live audio from microphones or sound cards for processing
- Record voice, instruments, or ambient sounds
- Use external audio sources in your audio graph
- Create interactive audio applications that respond to sound input

## Usage Notes

- Browser security requires user interaction before audio input can be accessed
- The first time you use this node, you'll need to grant permission to access your microphone
- Some devices may not be available if already in use by other applications
- For best results, use headphones to prevent feedback when using microphones`,
  tags: ["input", "microphone", "capture", "recording", "source"],
  portsDescription: {
    outputs: {
      output:
        "Audio output that provides the captured audio signal from the selected input device",
    },
  },
};

export default plugin;
