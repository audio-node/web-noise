# Delay AudioNode

A wrapper around the Web Audio API's [`DelayNode`](https://developer.mozilla.org/en-US/docs/Web/API/DelayNode) that delays audio signals by a specified amount of time.

## Overview

This module provides a wrapper for the Web Audio API's delay node, which is used to create time-based audio effects by delaying the incoming audio signal.

## Usage

```typescript
import delay from './audioNode';

// Create with an AudioContext
const delayNode = await delay(audioContext);

// Connect to other nodes
sourceNode.outputs.output.port.connect(delayNode.inputs.input.port);
delayNode.outputs.output.port.connect(destinationNode.inputs.input.port);

// Set delay time in seconds
delayNode.inputs.time.port.value = 0.5; // 500ms delay

// Or control delay time via another audio parameter
someSource.connect(delayNode.inputs.time.port);
```

## Interface

The delay node exposes:

- `inputs.input`: Audio input port that receives audio signals
- `inputs.time`: Audio parameter for controlling the delay time in seconds
- `outputs.output`: Audio output port that can be connected to other audio nodes

## Implementation

The delay node creates a delayed version of the input signal. It's commonly used for creating echo effects, chorus, and other time-based audio processing when combined with feedback loops and other audio nodes.