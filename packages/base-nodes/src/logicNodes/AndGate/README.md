# AND Gate AudioNode

A logical AND gate worklet that outputs 1 only when all inputs are 1.

[`Wikipedia`](https://en.wikipedia.org/wiki/AND_gate) 

## Overview

This module provides an AND gate implementation using AudioWorklet. The output is true (1) only when all inputs are true (1). If any input is false (0), the output becomes false (0).

## Usage

```typescript
import andGate from './audioNode';

// Create with an AudioContext
const gate = await andGate(audioContext);

// Connect input signals
inputA.connect(gate.inputs.A.port);
inputB.connect(gate.inputs.B.port);

// Connect to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Control via parameters
gate.inputs.A.port.value = 1;
gate.inputs.B.port.value = 1; // Output will be 1
```

## Interface

The AND gate node exposes:

- `inputs.A`: Audio parameter for first binary input (0 or 1)
- `inputs.B`: Audio parameter for second binary input (0 or 1)
- `outputs.Q`: Audio output port (1 only when both inputs are 1, otherwise 0)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

## Implementation

The AND gate uses an AudioWorklet processor that evaluates the logic expression `A && B` at audio rate, providing sample-accurate boolean operations for gate and trigger signals.
