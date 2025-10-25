# IMPLY Gate AudioNode

A logical implication gate worklet that outputs 0 only when A is 1 and B is 0.

[`Wikipedia`](https://en.wikipedia.org/wiki/IMPLY_gate) 

## Overview

This module provides an IMPLY gate implementation using AudioWorklet. The output implements material implication (A → B), which is false (0) only when the premise A is true (1) and the conclusion B is false (0). In all other cases, the output is true (1).

## Usage

```typescript
import implyGate from './audioNode';

// Create with an AudioContext
const gate = await implyGate(audioContext);

// Connect input signals
inputA.connect(gate.inputs.A.port);
inputB.connect(gate.inputs.B.port);

// Connect to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Control via parameters
gate.inputs.A.port.value = 1; // Premise
gate.inputs.B.port.value = 0; // Conclusion - Output will be 0
```

## Interface

The IMPLY gate node exposes:

- `inputs.A`: Audio parameter for premise input (0 or 1)
- `inputs.B`: Audio parameter for conclusion input (0 or 1)
- `outputs.Q`: Audio output port (0 only when A=1 and B=0, otherwise 1)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

## Implementation

The IMPLY gate uses an AudioWorklet processor that evaluates the logic expression `!A || B` at audio rate, providing sample-accurate boolean operations for gate and trigger signals. The expression is equivalent to material implication (A → B).
