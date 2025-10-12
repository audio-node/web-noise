# DynamicsCompressor AudioNode

A wrapper around the Web Audio API's [`DynamicsCompressorNode`](https://developer.mozilla.org/en-US/docs/Web/API/DynamicsCompressorNode) that controls the dynamic range of audio signals.

## Overview

This module provides a wrapper for the Web Audio API's dynamics compressor node, which is used to reduce the volume of loud sounds and amplify quiet sounds, effectively controlling the dynamic range of audio signals. It's commonly used in audio production to make sounds more consistent in volume.

## Usage

```typescript
import dynamicsCompressor from './audioNode';

// Create with an AudioContext
const compressor = await dynamicsCompressor(audioContext);

// Connect audio source to the compressor
sourceNode.outputs.out.port.connect(compressor.inputs.input.port);

// Connect compressor output to destination
compressor.outputs.output.port.connect(destinationNode.inputs.in.port);

// Configure compressor parameters
compressor.inputs.threshold.port.value = -24; // dB
compressor.inputs.knee.port.value = 30; // dB
compressor.inputs.ratio.port.value = 12; // ratio
compressor.inputs.attack.port.value = 0.003; // seconds
compressor.inputs.release.port.value = 0.25; // seconds

// Or control parameters via other audio nodes
someSource.connect(compressor.inputs.threshold.port);
```

## Interface

The dynamics compressor node exposes:

- `inputs.input`: Audio input port that receives audio signals to be processed
- `inputs.threshold`: Audio parameter for the decibel value above which compression will start
- `inputs.knee`: Audio parameter for the decibel curve at the threshold
- `inputs.ratio`: Audio parameter for the amount of compression (higher = more compression)
- `inputs.attack`: Audio parameter for how quickly compression is applied (in seconds)
- `inputs.release`: Audio parameter for how quickly compression is released (in seconds)
- `outputs.output`: Audio output port with the compressed signal

## Implementation

The dynamics compressor reduces the volume of loud parts of the signal and increases the volume of quiet parts, making the overall audio more consistent in volume. This is particularly useful for:

- Preventing audio clipping and distortion
- Making quiet sounds more audible
- Creating a more balanced mix
- Achieving a more professional sound