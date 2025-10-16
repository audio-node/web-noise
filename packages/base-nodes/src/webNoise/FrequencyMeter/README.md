# Frequency Meter Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Frequency Meter node analyzes an incoming audio signal to detect its fundamental frequency, or pitch. It outputs this frequency as a numerical signal, which can be used for tuning instruments, creating frequency-reactive visuals, or controlling other parameters in a patch.

## Usage

Connect an audio source to the `input` of the Frequency Meter. The detected frequency will be available at the `frequency` output. You can adjust the pitch detection algorithm and its parameters via the corresponding inputs.

```javascript
// Connect an oscillator to the frequency meter
const oscillator = await webNoise.createNode('oscillator', { values: { frequency: 440 } });
const frequencyMeter = await webNoise.createNode('frequencyMeter');
webNoise.connect(oscillator, 'out', frequencyMeter, 'input');

// The 'frequency' output can be connected to a Value Meter to display the result
const valueMeter = await webNoise.createNode('valueMeter');
webNoise.connect(frequencyMeter, 'frequency', valueMeter, 'in');
```

## Interface

### Inputs

-   **input**: The audio signal to be analyzed.
-   **method**: Selects the pitch detection algorithm to use.
-   **fftSize**: The size of the Fast Fourier Transform (FFT) buffer used for analysis.
-   **hopSize**: The interval at which the analysis is performed.

### Outputs

-   **frequency**: The detected fundamental frequency of the input signal in Hertz (Hz).

## Implementation

The node is built around an `AudioWorkletProcessor` that uses the `aubiojs` library to perform real-time pitch detection. It continuously analyzes the incoming audio stream according to the selected `method` and buffer settings, and outputs the resulting frequency value.
