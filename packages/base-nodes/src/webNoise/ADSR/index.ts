import { PluginComponent } from "@web-noise/core";
import base from "./base";
import controlPanelNode from "./ADSR";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode,
  configNode,
  resizable: true,
  defaultConfig,
  name: "ADSR (Envelope Generator)",
  description: "Generates Attack-Decay-Sustain-Release envelope signals for shaping audio parameters over time. Essential for creating dynamic volume, filter, and modulation effects in synthesizers.",
  info: `# ADSR Envelope Generator

An envelope generator that produces control signals for shaping audio parameters over time. ADSR envelopes are fundamental building blocks in sound synthesis and audio processing.

## Purpose

- Shape the amplitude of sounds to create natural dynamics
- Control filter cutoff for timbral evolution
- Modulate any parameter that accepts control signals
- Create percussive, sustained, or evolving sounds

## Values

- **Attack (A)**: Time (0-60s) for the envelope to reach peak level. Controls how quickly a sound fades in.
- **Attack Curve**: Shape (0-1) of the attack phase. Lower values create linear attacks, higher values create exponential attacks.
- **Decay (D)**: Time (0-60s) for the envelope to fall from peak to sustain level. Controls the initial fade after the attack.
- **Sustain (S)**: Level (0-1) maintained while the trigger is active. Controls the steady-state volume.
- **Release (R)**: Time (0-60s) for the envelope to fall from sustain to zero after trigger release. Controls how quickly a sound fades out.
- **Trigger**: Gate signal (0 or 1) that starts the envelope when > 0 and releases it when 0.`,
  tags: ["envelope", "modulation", "synthesis", "control", "adsr"],
  portsDescription: {
    inputs: {
      trigger: "Gate signal that starts the envelope when > 0 and releases it when 0",
      A: "Attack time in seconds (0-60s)",
      attackCurve: "Shape of the attack curve (0-1), where 0 is linear and 1 is exponential",
      D: "Decay time in seconds (0-60s)",
      S: "Sustain level (0-1)",
      R: "Release time in seconds (0-60s)"
    },
    outputs: {
      gain: "Envelope output signal (0-1) for controlling audio parameters"
    }
  }
};

export default plugin;
