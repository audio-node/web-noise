# Phase Vocoder (Pitch Shifter)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The Phase Vocoder node is a real-time pitch-shifting effect that changes the pitch of an audio signal without altering its duration. Based on the phase vocoder technique with FFT analysis and peak detection, this custom implementation allows for high-quality pitch manipulation commonly used in audio production, music creation, and sound design.

## Usage

The Phase Vocoder node processes audio in real-time, shifting the pitch by a specified factor while maintaining the original timing.

```typescript
import phaseVocoder from './audioNode';

// Create with an AudioContext
const vocoderNode = await phaseVocoder(audioContext);

// Connect an audio source
const oscillator = audioContext.createOscillator();
oscillator.connect(vocoderNode.inputs.input.port);

// Connect to destination
vocoderNode.outputs.output.port.connect(audioContext.destination);

// Set pitch shift factor
vocoderNode.inputs.pitch.port.value = 1.5;  // Shift up by 1.5x (perfect fifth)
vocoderNode.inputs.pitch.port.value = 0.5;  // Shift down by 0.5x (one octave down)
vocoderNode.inputs.pitch.port.value = 2.0;  // Shift up by 2x (one octave up)

// Start the source
oscillator.start();
```

## Interface

### Inputs

- **input**: Audio input signal to be pitch-shifted
- **pitch**: Pitch shift factor (multiplier), where 1.0 = no change, 2.0 = one octave up, 0.5 = one octave down

### Outputs

- **output**: Pitch-shifted audio signal

### Methods

The node uses standard Web Audio API methods inherited from AudioWorkletNode.

## Implementation

The Phase Vocoder node is implemented using an AudioWorkletProcessor that performs real-time pitch shifting through spectral analysis and resynthesis. The processor uses a 2048-sample buffered block size with FFT analysis to transform the audio into the frequency domain.

The algorithm employs peak detection in the frequency spectrum to identify prominent frequency components. These peaks and their regions of influence are shifted by the pitch factor while maintaining phase coherence through careful phase correction. A Hann window is applied to both input and output to minimize spectral artifacts.

The phase vocoder technique preserves the duration of the audio while shifting its pitch, making it ideal for musical applications where timing must remain constant. The implementation supports mono and multi-channel processing, allowing for complex stereo and surround sound pitch manipulation.
