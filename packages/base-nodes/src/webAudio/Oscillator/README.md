# Oscillator AudioNode

A wrapper around the Web Audio API's [`OscillatorNode`](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode) that generates audio signals.

## Overview

This module provides a wrapper for the Web Audio API's oscillator node, which generates periodic waveforms like sine, square, sawtooth, and triangle waves.

## Usage

```typescript
import oscillator from './audioNode';

// Create with an AudioContext
const osc = await oscillator(audioContext);

// Configure the oscillator
osc.setValues({ type: 'sine' }); // Other options: 'square', 'sawtooth', 'triangle'

// Connect to other nodes
osc.outputs.out.port.connect(someOtherNode.inputs.in.port);

// Control frequency via parameter or direct connection
osc.inputs.frequency.port.value = 440; // A4 note
someSource.connect(osc.inputs.frequency.port);

// Clean up when done
osc.destroy();
```

## Interface

The oscillator node exposes:

- `inputs.frequency`: Audio parameter for controlling the oscillator frequency
- `inputs.detune`: Audio parameter for detuning the oscillator (in cents)
- `outputs.out`: Audio output port that can be connected to other audio nodes
- `setValues({ type })`: Method to configure the oscillator type
- `destroy()`: Method to stop and clean up the oscillator
- `oscillator`: Direct access to the underlying Web Audio OscillatorNode

## Implementation

The oscillator starts automatically upon creation with an initial frequency of 0Hz and must be explicitly stopped using the `destroy()` method when no longer needed.
