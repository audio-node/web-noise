# XorGate AudioNode

A logical XOR (exclusive OR) gate implemented as an Audio Worklet that outputs 1 when inputs differ, 0 when inputs are the same.

[`Wikipedia`](https://en.wikipedia.org/wiki/XOR_gate) 

## Overview

This module provides a logic gate that performs XOR operations on two binary input signals. The output is 1 when exactly one input is 1, and 0 when both inputs are the same (both 0 or both 1). Useful for detecting differences, creating toggle behaviors, and generating complex rhythmic variations in modular synthesis.

## Usage

```typescript
import xorGate from './audioNode';

// Create with an AudioContext
const gate = await xorGate(audioContext);

// Connect input signals
someSource.connect(gate.inputs.A.port);
anotherSource.connect(gate.inputs.B.port);

// Connect output to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Set values directly
gate.inputs.A.port.value = 1; // First input
gate.inputs.B.port.value = 0; // Second input
```

## Interface

The XOR gate node exposes:

- `inputs.A`: Audio parameter for the first binary input signal (0 or 1)
- `inputs.B`: Audio parameter for the second binary input signal (0 or 1)
- `outputs.Q`: Audio output port that outputs 1 when inputs differ, 0 when inputs match

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Implementation

The XOR gate is implemented as an Audio Worklet Processor that processes signals at audio rate (a-rate). The logic operation is performed sample-by-sample: `output = A XOR B`, which evaluates to true (1) when the boolean values of A and B differ.
