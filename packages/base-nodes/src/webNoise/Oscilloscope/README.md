# Oscilloscope Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Oscilloscope node is a real-time visualizer that displays the waveform of an audio signal. It allows you to observe the shape, amplitude, and frequency of a signal over time. This node can display up to two separate signals simultaneously, making it an invaluable tool for analysis, debugging, and understanding signal interactions.

## Usage

Connect one or two audio sources to the `input1` and `input2` ports. The waveforms will be rendered in the node's display.

```javascript
// Connect an oscillator to the first input of the oscilloscope
const oscillator = await webNoise.createNode('oscillator');
const oscilloscope = await webNoise.createNode('oscilloscope');
webNoise.connect(oscillator, 'out', oscilloscope, 'input1');

// Connect another signal to the second input to compare them
const filter = await webNoise.createNode('filter');
webNoise.connect(oscillator, 'out', filter, 'in');
webNoise.connect(filter, 'out', oscilloscope, 'input2');
```

## Interface

### Inputs

-   **input1**: The first audio signal to be displayed.
-   **input2**: The second audio signal to be displayed.
-   **fftSize**: The size of the buffer used for analysis. This determines the "window" of the waveform that is displayed.

### Outputs

This node has no outputs as it is purely for visualization.

## Implementation

The Oscilloscope uses an `AudioWorkletProcessor` to capture chunks of the incoming audio signals from its inputs. This data is then efficiently transferred to the main thread using `MessageChannel`s. The visualization is rendered on a `<canvas>` element, with options for customizing colors and a grid overlay for easier analysis.
