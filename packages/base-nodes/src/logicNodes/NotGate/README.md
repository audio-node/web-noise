# NOT Gate AudioNode

A logical NOT gate worklet that inverts binary signals.

[`Wikipedia`](https://en.wikipedia.org/wiki/Inverter_(logic_gate)) 

## Overview

This module provides a NOT gate (inverter) implementation using AudioWorklet. When the input is true (1), the output becomes false (0), and vice versa.

## Usage

```typescript
import notGate from './audioNode';

// Create with an AudioContext
const gate = await notGate(audioContext);

// Connect input signal
inputSignal.connect(gate.inputs.in.port);

// Connect to other nodes
gate.outputs.out.port.connect(someOtherNode.inputs.in.port);

// Control via parameter
gate.inputs.in.port.value = 1; // Output will be 0
```

## Interface

The NOT gate node exposes:

- `inputs.in`: Audio parameter for binary input (0 or 1)
- `outputs.out`: Audio output port (inverted input signal)

## Truth Table

| IN | OUT |
|----|-----|
| 0  | 1   |
| 1  | 0   |

## Implementation

The NOT gate uses an AudioWorklet processor that evaluates the logic expression `!IN` at audio rate, providing sample-accurate boolean inversion for gate and trigger signals.
