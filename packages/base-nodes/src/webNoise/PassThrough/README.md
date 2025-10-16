# Pass Through Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/GainNode)

## Overview

The Pass Through node is a simple utility that passes an incoming signal directly to its output without any modification. It functions as a virtual cable, which can be useful for organizing and clarifying the routing of complex patches.

## Usage

Connect any signal to the `in` port, and the identical signal will be available at the `out` port.

```javascript
// Use a Pass Through node to help organize a patch
const oscillator = await webNoise.createNode('oscillator');
const passThrough = await webNoise.createNode('passThrough');
const destination = await webNoise.createNode('destination');

webNoise.connect(oscillator, 'out', passThrough, 'in');
webNoise.connect(passThrough, 'out', destination, 'in');

// The oscillator signal now passes through the utility node before reaching the destination.
```

## Interface

### Inputs

-   **in**: The signal to be passed through.

### Outputs

-   **out**: The unmodified output signal.

## Implementation

The node is implemented using a `GainNode` with its `gain` value permanently set to 1. This provides a direct, one-to-one mapping from the input to the output with minimal processing overhead.
