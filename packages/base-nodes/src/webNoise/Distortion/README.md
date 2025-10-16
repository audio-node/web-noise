# Distortion Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode)

## Overview

The Distortion node uses a waveshaper to alter the input signal's waveform, adding harmonic content and creating effects ranging from subtle warmth to heavy fuzz. It generates a shaping curve based on the `drive` and `type` parameters and applies it to the incoming audio.

## Usage

Connect an audio source to the `input` and control the amount of distortion with the `drive` input. You can select different distortion algorithms using the `type` input.

```javascript
// Connect an oscillator to the distortion node
const oscillator = await webNoise.createNode('oscillator');
const distortion = await webNoise.createNode('distortion');
webNoise.connect(oscillator, 'out', distortion, 'input');

// Control the drive amount with a slider or another signal
const driveControl = await webNoise.createNode('slider', { values: { value: 0.5 } });
webNoise.connect(driveControl, 'out', distortion, 'drive');

// The distorted signal is available at the 'output' port
```

## Interface

### Inputs

-   **input**: The audio signal to be distorted.
-   **drive**: Controls the intensity of the distortion effect. Accepts a numerical value or an audio-rate signal.
-   **type**: Selects the distortion algorithm (e.g., clipper, analog warmth, fuzz).

### Outputs

-   **output**: The distorted audio signal.

## Implementation

This node is a composite of a `WaveShaperNode` and an `AudioWorkletProcessor`. The worklet (`distortion-processor`) dynamically generates a transfer curve based on the `drive` and `type` inputs. This curve is then sent to the `WaveShaperNode`, which applies the distortion to the main audio signal. This approach allows for real-time, audio-rate modulation of the distortion shape.
