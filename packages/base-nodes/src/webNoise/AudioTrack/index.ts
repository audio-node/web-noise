import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioTrack from "./AudioTrack";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: AudioTrack,
  configNode,
  defaultConfig,
  resizable: true,
  minSize: { width: 280, height: 290 },
  name: "Audio Track",
  description:
    "Plays audio from a URL. Supports looping, playback rate control, and defining playback ranges.",
  info: `# Audio Track

Plays audio from a URL. It's suitable for playing samples, loops, or backing tracks.

## Purpose

- Play audio files
- Create samplers and drum machines
- Control playback with gates and triggers

## Values

- **url**: URL of the audio file to load.

hit Enter or click the arrow button after pasting URL to load the file`,
  tags: ["audio", "sampler", "playback", "buffer", "track"],
  portsDescription: {
    inputs: {
      gate: "Gate signal to start (>=0.5) and stop (<0.5) playback.",
      restart: "Trigger signal to reset playback to the start of the range.",
      loop: "Toggle looping (0 for off, 1 for on).",
      start: "Playback start time in seconds.",
      end: "Playback end time in seconds.",
      detune: "Playback detune in cents.",
      playbackRate: "Controls the playback speed.",
    },
    outputs: {
      out: "The main audio output.",
      gate: "Gate signal indicating if the track is currently playing.",
      duration: "The total duration of the audio in seconds.",
      time: "The current playback time in seconds.",
    },
  },
};

export default plugin;
