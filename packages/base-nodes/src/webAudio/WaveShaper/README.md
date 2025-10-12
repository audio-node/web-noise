# WaveShaper

A wrapper for the [WaveShaperNode](https://developer.mozilla.org/en-US/docs/Web/API/WaveShaperNode) from the Web Audio API.

## Overview

The WaveShaper node applies a non-linear distortion to an audio signal by mapping input values to output values using a curve. It allows you to create custom distortion effects, waveshaping, and other non-linear transformations of audio signals.

## Usage

```javascript
// Example of connecting a source to a waveshaper
const oscillator = await createOscillator(audioContext);
const waveShaper = await createWaveShaper(audioContext, {
  values: {
    // Define control points for the waveshaping curve
    points: [
      { x: 0, y: 0 },     // Bottom-left
      { x: 0.5, y: 1 },   // Middle-top
      { x: 1, y: 0 }      // Bottom-right
    ],
    splineType: "monotonic",
    oversample: "4x"
  }
});

// Connect oscillator to waveshaper
oscillator.outputs.out.port.connect(waveShaper.inputs.input.port);

// Connect waveshaper to destination
waveShaper.outputs.output.port.connect(audioContext.destination);
```

## Interface

### Inputs
- `input`: Audio input signal to be processed

### Outputs
- `output`: Processed audio output

### Methods
- `setValues({ points, splineType, oversample })`: Updates the waveshaping curve and parameters
  - `points`: Array of control points defining the curve shape
  - `splineType`: Interpolation type ("monotonic" or "natural")
  - `oversample`: Oversampling level ("none", "2x", or "4x")

## Implementation

The WaveShaper node is implemented using the Web Audio API's `WaveShaperNode`. It transforms audio signals by applying a custom curve that maps input values to output values.

The curve is defined by a set of control points that can be manipulated through a visual editor. The points are interpolated using either monotonic or natural cubic splines to create a smooth curve. This curve is then used to map input audio sample values (in the range of -1 to 1) to output values.

Oversampling can be enabled to reduce aliasing artifacts that commonly occur with non-linear processing. Three options are available:
- `"none"`: No oversampling
- `"2x"`: 2x oversampling
- `"4x"`: 4x oversampling

Higher oversampling values provide better audio quality but require more processing power.