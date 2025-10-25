# NAND Gate AudioNode

A logical NAND (NOT-AND) gate worklet that outputs 0 only when all inputs are 1.

[`Wikipedia`](https://en.wikipedia.org/wiki/NAND_gate) 

## Overview

This module provides a NAND gate implementation using AudioWorklet. NAND gates are universal logic gates - any other logic gate can be constructed using only NAND gates. The output is false (0) only when all inputs are true (1), otherwise the output is true (1).

## Usage

```typescript
import nandGate from './audioNode';

// Create with an AudioContext
const gate = await nandGate(audioContext);

// Connect input signals
inputA.connect(gate.inputs.A.port);
inputB.connect(gate.inputs.B.port);

// Connect to other nodes
gate.outputs.Q.port.connect(someOtherNode.inputs.in.port);

// Control via parameters
gate.inputs.A.port.value = 1;
gate.inputs.B.port.value = 1; // Output will be 0
```

## Interface

The NAND gate node exposes:

- `inputs.A`: Audio parameter for first binary input (0 or 1)
- `inputs.B`: Audio parameter for second binary input (0 or 1)
- `outputs.Q`: Audio output port (0 when both inputs are 1, otherwise 1)

## Truth Table

| A | B | Q |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

## Implementation

The NAND gate uses an AudioWorklet processor that evaluates the logic expression `!(A && B)` at audio rate, providing sample-accurate boolean operations for gate and trigger signals.
