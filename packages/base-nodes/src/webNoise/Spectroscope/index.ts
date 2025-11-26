import { PluginComponent } from "@web-noise/core";
import Spectroscope from "./Spectroscope";
import node from "./Node";
import configNode from "./Config";
import defaultConfig from "./defaultConfig";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  controlPanelNode: Spectroscope,
  configNode,
  defaultConfig,
  resizable: true,
  minSize: { width: 280, height: 280 },
  name: "Spectroscope (Frequency Analyzer)",
  description:
    "Real-time frequency spectrum analyzer that visualizes audio frequency content using FFT analysis. Essential for understanding harmonic structure, identifying frequencies, and monitoring spectral balance in mixing and sound design.",
  info: `# Spectroscope (Frequency Analyzer)

A real-time frequency spectrum analyzer that uses Fast Fourier Transform (FFT) to visualize the frequency content of audio signals. The spectroscope provides detailed insight into harmonic structure, overtones, and spectral characteristics.

## Purpose

- Visualize frequency content and harmonic structure of audio signals
- Identify fundamental frequencies and overtones in musical material
- Monitor spectral balance during mixing and mastering
- Analyze resonances and problem frequencies in sound design
- Educational tool for understanding frequency relationships and harmonics

The spectroscope is a non-destructive analysis tool—it does not modify the audio signal and has no audio output.`,
  tags: [
    "visualization",
    "analysis",
    "spectrum",
    "frequency",
    "fft",
    "analyzer",
  ],
  portsDescription: {
    inputs: {
      input: "Audio signal to analyze for frequency content",
      fftSize:
        "FFT window size (default: 2048), must be power of 2, controls frequency vs time resolution",
    },
    outputs: {},
  },
};

export default plugin;
