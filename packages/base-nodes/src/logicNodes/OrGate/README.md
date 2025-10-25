# OR Gate AudioNode

A logical OR gate worklet that outputs 1 when at least one input is 1.

[`Wikipedia`](https://en.wikipedia.org/wiki/OR_gate) 

## Overview

This module provides an OR gate implementation using AudioWorklet. The output is true (1) when at least one input is true (1). The output is false (0) only when all inputs are false (0).

## Usage

```typescript
import orGate from './audioNode';

// Create with an AudioContext
const gate = await orGate(audioContext);

// Connect input signals
inputA.connect(gate.inputs.A.port);
inputB.connect(gate.inputs.B.port);

// Connect to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Control via parameters
gate.inputs.A.port.value = 0;
gate.inputs.B.port.value = 1; // Output will be 1
```

## Interface

The OR gate node exposes:

- `inputs.A`: Audio parameter for first binary input (0 or 1)
- `inputs.B`: Audio parameter for second binary input (0 or 1)
- `outputs.Q`: Audio output port (1 when at least one input is 1, otherwise 0)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

## Implementation

The OR gate uses an AudioWorklet processor that evaluates the logic expression `A || B` at audio rate, providing sample-accurate boolean operations for gate and trigger signals.
