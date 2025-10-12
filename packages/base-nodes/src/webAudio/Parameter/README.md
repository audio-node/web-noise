# Parameter AudioNode

A wrapper around the Web Audio API's [`ConstantSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/ConstantSourceNode) that provides a configurable constant value output.

## Overview

This module provides a wrapper for the Web Audio API's constant source node, which outputs a steady, unchanging value. It's useful for controlling parameters of other audio nodes or as a source of constant values in an audio graph.

## Usage

```typescript
import constantSource from './constantSource';

// Create with an AudioContext
const param = constantSource(audioContext);

// Set the constant value
param.setValues({ value: 440 }); // Set to 440

// Connect to other node parameters
param.outputs.out.port.connect(someNode.inputs.frequency.port);

// Clean up when done
param.destroy();
```

## Interface

The parameter node exposes:

- `inputs.offset`: Audio parameter for modulating the constant value
- `outputs.out`: Audio output port that can be connected to other audio parameters
- `setValues({ value })`: Method to set the constant output value
- `destroy()`: Method to stop and clean up the constant source
- `constantSource`: Direct access to the underlying Web Audio ConstantSourceNode

## Implementation

The parameter node creates a ConstantSourceNode that starts automatically upon creation with an initial value of 0. It must be explicitly stopped using the `destroy()` method when no longer needed. The node is commonly used to provide control values to audio parameters like frequency, gain, etc.