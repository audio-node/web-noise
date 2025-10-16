# Limiter Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Limiter node is a dynamics processor that prevents the amplitude of an audio signal from exceeding a predetermined threshold. It acts as a ceiling, ensuring that the output signal does not clip or cause distortion. This is particularly useful as a final stage in an audio chain to control overall levels and protect against sudden peaks.

## Usage

Place the Limiter node at the end of an audio signal chain to control the final output level.

```javascript
// Connect an audio source to the limiter
const oscillator = await webNoise.createNode('oscillator');
const limiter = await webNoise.createNode('limiter');
webNoise.connect(oscillator, 'out', limiter, 'input');

// Connect the limiter's output to the destination
const destination = await webNoise.createNode('destination');
webNoise.connect(limiter, 'output', destination, 'in');

// The oscillator's signal will now be limited before reaching the output.
```

## Interface

### Inputs

-   **input**: The audio signal to be limited.

### Outputs

-   **output**: The limited audio signal. The signal will be attenuated if its peaks exceed the internal threshold.

## Implementation

The Limiter is implemented as an `AudioWorkletProcessor`. It analyzes the incoming audio signal's envelope and applies gain reduction when the level surpasses a hard-coded threshold. This implementation is based on a peak limiter design that uses a delay buffer to look ahead and react to upcoming peaks smoothly. Currently, the threshold and release time are fixed within the worklet.
