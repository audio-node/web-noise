# Quantizer (Bit Depth Reducer)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The Quantizer node is a bit depth reduction effect that reduces the resolution of an audio signal by limiting the number of bits used to represent each sample. This custom implementation creates lo-fi, digital distortion effects commonly used in electronic music, sound design, and to emulate vintage digital audio equipment.

## Usage

The Quantizer node processes audio by reducing its bit depth, creating characteristic digital artifacts and harmonic distortion.

```typescript
import quantizer from './audioNode';

// Create with an AudioContext
const quantizerNode = await quantizer(audioContext);

// Connect an audio source
const oscillator = audioContext.createOscillator();
oscillator.connect(quantizerNode.inputs.input.port);

// Connect to destination
quantizerNode.outputs.output.port.connect(audioContext.destination);

// Set bit depth
quantizerNode.inputs.bitDepth.port.value = 8;   // 8-bit audio (classic video game sound)
quantizerNode.inputs.bitDepth.port.value = 4;   // 4-bit audio (heavy digital distortion)
quantizerNode.inputs.bitDepth.port.value = 16;  // 16-bit audio (CD quality - minimal effect)
quantizerNode.inputs.bitDepth.port.value = 1;   // 1-bit audio (extreme distortion)

// Start the source
oscillator.start();
```

## Interface

### Inputs

- **input**: Audio input signal to be quantized
- **bitDepth**: Bit depth for quantization (typically 1-16 bits)

### Outputs

- **output**: Quantized audio signal with reduced bit depth

### Methods

The node uses standard Web Audio API methods inherited from AudioWorkletNode.

## Implementation

The Quantizer node is implemented using an AudioWorkletProcessor that performs bit depth reduction through sample quantization. The processor takes each audio sample and rounds it to the nearest value that can be represented with the specified bit depth.

The quantization algorithm calculates the maximum integer value that can be represented with the given bit depth (2^(bitDepth-1) - 1), then scales the input sample to this range, rounds it to the nearest integer, and scales it back to the audio range of -1 to 1. This process effectively reduces the resolution of the audio signal, introducing quantization noise and harmonic distortion.

Lower bit depths produce more pronounced digital artifacts and distortion. At very low bit depths (1-4 bits), the effect creates harsh, metallic timbres and significant harmonic content. At moderate bit depths (8-12 bits), the effect produces lo-fi, vintage digital character. The implementation supports multi-channel processing, allowing the effect to be applied to stereo and surround sound signals.
