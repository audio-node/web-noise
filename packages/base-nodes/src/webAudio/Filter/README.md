# Filter

A wrapper for the [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode) from the Web Audio API.

## Overview

The Filter node provides audio filtering capabilities, allowing you to shape the frequency content of audio signals. It can be used to create low-pass, high-pass, band-pass, and other filter types to emphasize or attenuate specific frequency ranges.

## Usage

```javascript
// Example of connecting a source to a filter
const oscillator = await createOscillator(audioContext);
const filter = await createFilter(audioContext, {
  values: { type: 'lowpass' }
});

// Connect oscillator to filter
oscillator.outputs.out.port.connect(filter.inputs.in.port);

// Set filter parameters
filter.inputs.frequency.port.value = 1000; // 1000 Hz cutoff
filter.inputs.Q.port.value = 5; // Resonance
```

## Interface

### Inputs
- `in`: Audio input signal to be filtered
- `frequency`: Cutoff or center frequency of the filter (in Hz)
- `detune`: Detune value in cents
- `Q`: Q factor (resonance/bandwidth)
- `gain`: Gain for some filter types (like peaking and shelving)

### Outputs
- `out`: Filtered audio output

### Methods
- `setValues({ type })`: Sets the filter type

## Implementation

The Filter node is implemented using the Web Audio API's `BiquadFilterNode`. It supports all standard filter types:

- `lowpass`: Allows frequencies below the cutoff frequency
- `highpass`: Allows frequencies above the cutoff frequency
- `bandpass`: Allows a range of frequencies around the center frequency
- `lowshelf`: Boosts or attenuates lower frequencies
- `highshelf`: Boosts or attenuates higher frequencies
- `peaking`: Boosts or attenuates a range of frequencies
- `notch`: Removes a range of frequencies
- `allpass`: Alters phase relationships without affecting amplitude

The implementation provides direct access to all BiquadFilterNode parameters through its inputs, allowing for dynamic control of the filter's behavior during audio processing.