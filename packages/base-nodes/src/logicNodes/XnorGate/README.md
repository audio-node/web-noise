# XNOR Gate AudioNode

A logical XNOR gate worklet that outputs 1 when both inputs are the same.

[`Wikipedia`](https://en.wikipedia.org/wiki/XNOR_gate) 

## Overview

This module provides an XNOR gate implementation using AudioWorklet. The output is true (1) when both inputs are equal (both 0 or both 1). If inputs differ, the output becomes false (0).

## Usage

```typescript
import xnorGate from './audioNode';

// Create with an AudioContext
const gate = await xnorGate(audioContext);

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

The XNOR gate node exposes:

- `inputs.A`: Audio parameter for first binary input (0 or 1)
- `inputs.B`: Audio parameter for second binary input (0 or 1)
- `outputs.Q`: Audio output port (1 when both inputs are the same, otherwise 0)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

## Implementation

The XNOR gate uses an AudioWorklet processor that evaluates the logic expression `A === B` at audio rate, providing sample-accurate boolean operations for gate and trigger signals.
