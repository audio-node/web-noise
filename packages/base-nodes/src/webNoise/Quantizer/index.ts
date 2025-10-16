import { PluginComponent } from "@web-noise/core";
import { WNNode as node } from "@web-noise/core";
import base from "./base";

const plugin: PluginComponent = {
  ...base,
  node,
  name: "Quantizer (Bit Depth Reducer)",
  description: "Reduces the bit depth of signals",
  info: `# Quantizer (Bit Depth Reducer)

A bit depth reduction processor that creates lo-fi and digital distortion effects by quantizing audio samples. The quantizer reduces audio resolution, producing characteristic digital artifacts ranging from subtle vintage warmth to extreme digital degradation.

## Purpose

- Create lo-fi and retro digital audio effects
- Emulate vintage samplers and digital audio equipment
- Add digital distortion and harmonic content to sounds
- Design aggressive, metallic timbres for electronic music
- Produce bit-crushed effects for sound design
`,
  tags: ["bitcrusher", "distortion", "lo-fi", "effect", "digital", "quantization"],
  portsDescription: {
    inputs: {
      input: "Audio signal to be quantized",
      bitDepth: "Number of bits for quantization (1-16), where lower values create more distortion"
    },
    outputs: {
      output: "Quantized audio signal with reduced bit depth and digital artifacts"
    }
  }
};

export default plugin;
