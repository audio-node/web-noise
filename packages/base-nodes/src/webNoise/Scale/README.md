# Scale (Range Mapper)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The Scale node is a range mapping utility that converts input values from one range to another. This custom implementation performs linear scaling and clamping, commonly used in modular synthesis for converting control signals between different ranges, adapting LFO outputs, or mapping sensor data to audio parameters.

## Usage

The Scale node takes an input signal and remaps it from an input range to an output range, with automatic clamping to prevent values from exceeding boundaries.

```typescript
import scale from './audioNode';

// Create with an AudioContext
const scaleNode = await scale(audioContext);

// Connect an LFO that outputs -1 to 1
const lfo = audioContext.createOscillator();
lfo.frequency.value = 2;
lfo.connect(scaleNode.inputs.in.port);

// Create constant sources to define the ranges
const inMinNode = audioContext.createConstantSource();
inMinNode.offset.value = -1; // Input minimum
inMinNode.connect(scaleNode.inputs.inMin.port);

const inMaxNode = audioContext.createConstantSource();
inMaxNode.offset.value = 1; // Input maximum
inMaxNode.connect(scaleNode.inputs.inMax.port);

const outMinNode = audioContext.createConstantSource();
outMinNode.offset.value = 200; // Output minimum (Hz)
outMinNode.connect(scaleNode.inputs.outMin.port);

const outMaxNode = audioContext.createConstantSource();
outMaxNode.offset.value = 2000; // Output maximum (Hz)
outMaxNode.connect(scaleNode.inputs.outMax.port);

// Connect to control oscillator frequency
scaleNode.outputs.out.port.connect(targetOscillator.frequency);

// Start the sources
inMinNode.start();
inMaxNode.start();
outMinNode.start();
outMaxNode.start();
lfo.start();
```

## Interface

### Inputs

- **in**: Input signal to be scaled
- **inMin**: Minimum value of the input range (default: -1)
- **inMax**: Maximum value of the input range (default: 1)
- **outMin**: Minimum value of the output range (default: -1)
- **outMax**: Maximum value of the output range (default: 1)

### Outputs

- **out**: Scaled output signal mapped to the output range

### Methods

The node uses standard Web Audio API methods inherited from AudioWorkletNode.

## Implementation

The Scale node is implemented using an AudioWorkletProcessor that performs linear range mapping on each audio sample. The processor takes five input channels: the signal to be scaled, and four control signals defining the input and output ranges.

For each sample, the algorithm first clamps the input value to the input range (inMin to inMax) to prevent out-of-bounds values. It then normalizes the clamped input to a 0-1 range by subtracting the input minimum and dividing by the input range span. Finally, it scales this normalized value to the output range by multiplying by the output span and adding the output minimum.

The mathematical formula is: `output = ((clamp(input, inMin, inMax) - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin`. This linear interpolation ensures smooth, predictable scaling behavior. All range parameters can be modulated in real-time, allowing for dynamic range adjustments. The implementation supports multi-channel processing, with each channel's range parameters processed independently.
