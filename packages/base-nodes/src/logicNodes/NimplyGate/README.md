# NIMPLY Gate AudioNode

A logical non-implication gate worklet that outputs 1 only when A is 1 and B is 0.

[`Wikipedia`](https://en.wikipedia.org/wiki/Material_nonimplication) 

## Overview

This module provides a NIMPLY gate implementation using AudioWorklet. The output implements material non-implication ¬(A → B), which is equivalent to A ∧ ¬B. The output is true (1) only when A is true (1) and B is false (0). In all other cases, the output is false (0).

## Usage

```typescript
import nimplyGate from './audioNode';

// Create with an AudioContext
const gate = await nimplyGate(audioContext);

// Connect input signals
inputA.connect(gate.inputs.A.port);
inputB.connect(gate.inputs.B.port);

// Connect to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Control via parameters
gate.inputs.A.port.value = 1; // Enable
gate.inputs.B.port.value = 0; // Not inhibited - Output will be 1
```

## Interface

The NIMPLY gate node exposes:

- `inputs.A`: Audio parameter for premise input (0 or 1)
- `inputs.B`: Audio parameter for inhibit input (0 or 1)
- `outputs.Q`: Audio output port (1 only when A=1 and B=0, otherwise 0)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Implementation

The NIMPLY gate uses an AudioWorklet processor that evaluates the logic expression `A && !B` at audio rate, providing sample-accurate boolean operations for gate and trigger signals. The expression is equivalent to material non-implication ¬(A → B).
