# MIDI to Frequency Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The MIDI to Frequency node converts a standard MIDI note number (0-127) into its corresponding frequency in Hertz (Hz). This is a crucial utility for translating MIDI pitch information from controllers or sequencers into a format usable by oscillators and other frequency-controlled modules. It also includes a `tune` input for fine-tuning the base frequency.

## Usage

Connect a MIDI note number signal (e.g., from a MIDI Input or MIDI Note node) to the `midi` input. The `out` port will then provide the calculated frequency. The `tune` input can be used to adjust the A4 reference frequency.

```javascript
// Connect a MIDI Note to this node
const midiNote = await webNoise.createNode('midiNote', { values: { value: 69 } }); // A4
const midiToFreq = await webNoise.createNode('midiToFrequency');
webNoise.connect(midiNote, 'out', midiToFreq, 'midi');

// Connect the output frequency to an oscillator
const oscillator = await webNoise.createNode('oscillator');
webNoise.connect(midiToFreq, 'out', oscillator, 'frequency');

// The oscillator will now play A4 (440 Hz).
```

## Interface

### Inputs

-   **midi**: The incoming MIDI note number (0-127).
-   **tune**: An optional base frequency (in Hz) to tune against. Defaults to 440 Hz (A4).

### Outputs

-   **out**: The calculated frequency in Hertz (Hz).

## Implementation

This node reuses the `MathNode`'s `AudioWorkletProcessor`. It passes a pre-defined JavaScript expression `(B ? B : 440) * Math.pow(2, (A - 69) / 12)` to the `MathNode` worklet. The `midi` input is mapped to the `A` parameter of the `MathNode`, and the `tune` input is mapped to the `B` parameter. This expression correctly calculates the frequency based on the MIDI note number, with 69 being A4 (440 Hz).
