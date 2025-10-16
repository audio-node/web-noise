# Gauge Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Gauge node provides a visual representation of a single numerical value in the form of a radial gauge. It is ideal for monitoring signals where an analog-style meter is desired, such as displaying levels, modulation depth, or other control signals.

## Usage

Connect any numerical signal to the `in` port of the Gauge node. The node's graphical interface will display the instantaneous value of the signal on the gauge.

```javascript
// Connect a signal to the gauge for visualization
const lfo = await webNoise.createNode('oscillator', { values: { frequency: 1 } });
const gauge = await webNoise.createNode('gauge');
webNoise.connect(lfo, 'out', gauge, 'in');

// The gauge will now display the output of the LFO.
```

## Interface

### Inputs

-   **in**: The numerical signal to be visualized.

### Outputs

This node has no outputs.

## Implementation

The Gauge node reuses the `audioNode` from the `ValueMeter` node, which employs an `AudioWorkletProcessor` to efficiently transfer data from the audio thread to the main thread. The visualization itself is rendered on a `<canvas>` element, with an offscreen worker handling the drawing logic for smooth animation. The appearance of the gauge, including its range, ticks, and colors, is highly customizable through the node's configuration panel.
