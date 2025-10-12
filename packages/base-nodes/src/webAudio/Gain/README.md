# Gain AudioNode

A wrapper around the Web Audio API's [`GainNode`](https://developer.mozilla.org/en-US/docs/Web/API/GainNode) that controls the volume of audio signals.

## Overview

This module provides a wrapper for the Web Audio API's gain node, which is used to control the amplitude (volume) of audio signals passing through it.

## Usage

```typescript
import gain from './audioNode';

// Create with an AudioContext
const gainNode = await gain(audioContext);

// Connect to other nodes
sourceNode.outputs.out.port.connect(gainNode.inputs.in.port);
gainNode.outputs.out.port.connect(destinationNode.inputs.in.port);

// Control gain via parameter or direct connection
gainNode.inputs.gain.port.value = 0.5; // 50% volume
someSource.connect(gainNode.inputs.gain.port);
```

## Interface

The gain node exposes:

- `inputs.in`: Audio input port that receives audio signals
- `inputs.gain`: Audio parameter for controlling the gain (volume) level
- `outputs.out`: Audio output port that can be connected to other audio nodes

## Implementation

The gain node is initialized with a gain value of 0 (silent) and must be explicitly set to a non-zero value to hear any audio passing through it.