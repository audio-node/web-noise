# StereoPanner

A wrapper for the [StereoPannerNode](https://developer.mozilla.org/en-US/docs/Web/API/StereoPannerNode) from the Web Audio API.

## Overview

The StereoPanner node provides a simple way to position audio in the stereo field (left to right). It allows you to pan audio signals between left and right channels, creating spatial effects and stereo positioning.

## Usage

```javascript
// Example of connecting a source to a stereo panner
const oscillator = await createOscillator(audioContext);
const stereoPanner = await createStereoPanner(audioContext);

// Connect oscillator to panner
oscillator.outputs.out.port.connect(stereoPanner.inputs.input.port);

// Set pan position (-1 = full left, 0 = center, 1 = full right)
stereoPanner.inputs.pan.port.value = 0.5; // Slightly to the right

// Connect panner to destination
stereoPanner.outputs.output.port.connect(audioContext.destination);
```

## Interface

### Inputs
- `input`: Audio input signal to be panned
- `pan`: Pan position value between -1 (full left) and 1 (full right)

### Outputs
- `output`: Panned audio output

## Implementation

The StereoPanner node is implemented using the Web Audio API's `StereoPannerNode`. It provides a simple and efficient way to position audio in the stereo field.

The `pan` parameter accepts values in the range of -1 to 1:
- `-1.0`: Audio is positioned fully left
- `0.0`: Audio is centered (equal power in both channels)
- `1.0`: Audio is positioned fully right

The implementation uses equal-power panning, which maintains a consistent perceived volume as the sound moves from left to right. This creates a more natural stereo effect compared to simple linear panning.
