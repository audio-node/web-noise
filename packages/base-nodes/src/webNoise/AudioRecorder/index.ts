import { PluginComponent } from "@web-noise/core";
import base from "./base";
import AudioRecorder from "./AudioRecorder";
import node from "./Node";
import configNode from "../AudioTrack/Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: AudioRecorder,
  configNode,
  defaultConfig,
  name: "Audio Recorder",
  description:
    "Records audio from an input stream into a buffer, which can then be played back or downloaded.",
  info: `# Audio Recorder

The Audio Recorder node captures audio from an input and stores it in an internal buffer. Once the recording is complete, the audio can be played back and manipulated like a regular audio track. It's ideal for sampling, live performance, and sound design.

## Purpose

- Capture live audio input
- Create and manipulate audio samples
- Debug and analyze audio signals
- Download recorded audio for external use

## Values

- **record**: Gate signal (0 or 1) to start/stop recording.
- **erase**: Trigger signal to clear the recorded buffer.
- **play**: Gate signal to start/stop playback.
- **loop**: Toggle looping (0 or 1).
- **playbackRate**: Controls the playback speed of the audio.`,
  tags: ["audio", "recorder", "sampler", "buffer", "capture"],
  portsDescription: {
    inputs: {
      input: "The audio stream to be recorded.",
      record: "Gate signal to start (>=0.5) and stop (<0.5) recording.",
      erase: "Trigger signal to clear the recorded audio.",
      play: "Gate signal to play the recorded audio.",
      restart: "Trigger signal to restart playback from the beginning.",
      loop: "Toggle looping (0 for off, 1 for on).",
      start: "Playback start time in seconds.",
      end: "Playback end time in seconds.",
      detune: "Playback detune in cents.",
      playbackRate: "Controls the playback speed.",
    },
    outputs: {
      output: "The audio output of the recorded sample.",
    },
  },
};

export default plugin;
