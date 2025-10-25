# NOR Gate AudioNode

A logical NOR (NOT-OR) gate worklet that outputs 1 only when all inputs are 0.

[`Wikipedia`](https://en.wikipedia.org/wiki/NOR_gate) 

## Overview

This module provides a NOR gate implementation using AudioWorklet. NOR gates are universal logic gates - any other logic gate can be constructed using only NOR gates. The output is true (1) only when all inputs are false (0), otherwise the output is false (0).

## Usage

```typescript
import norGate from './audioNode';

// Create with an AudioContext
const gate = await norGate(audioContext);

// Connect input signals
inputA.connect(gate.inputs.A.port);
inputB.connect(gate.inputs.B.port);

// Connect to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Control via parameters
gate.inputs.A.port.value = 0;
gate.inputs.B.port.value = 0; // Output will be 1
```

## Interface

The NOR gate node exposes:

- `inputs.A`: Audio parameter for first binary input (0 or 1)
- `inputs.B`: Audio parameter for second binary input (0 or 1)
- `outputs.Q`: Audio output port (1 only when both inputs are 0, otherwise 0)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

## Implementation

The NOR gate uses an AudioWorklet processor that evaluates the logic expression `!(A || B)` at audio rate, providing sample-accurate boolean operations for gate and trigger signals.
