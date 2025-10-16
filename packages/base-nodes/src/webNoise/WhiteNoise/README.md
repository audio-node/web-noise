# White Noise (Noise Generator)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The White Noise node is a random noise generator that produces white noise—a signal containing equal energy across all frequencies. This custom implementation generates random samples at audio rate, commonly used in sound design, synthesis, percussion sounds, and as a modulation source for creating unpredictable sonic textures.

## Usage

The White Noise node generates a continuous stream of random values between -1 and 1, creating the characteristic "hiss" sound of white noise.

```typescript
import whiteNoise from './audioNode';

// Create with an AudioContext
const noiseNode = await whiteNoise(audioContext);

// Connect directly to speakers (may be loud!)
noiseNode.outputs.out.port.connect(audioContext.destination);

// Better: control the volume with a gain node
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.1; // Reduce volume to 10%
noiseNode.outputs.out.port.connect(gainNode);
gainNode.connect(audioContext.destination);

// Use with a filter to create colored noise
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 1000; // Low-pass at 1kHz
noiseNode.outputs.out.port.connect(filter);
filter.connect(audioContext.destination);

// Use as a modulation source
const lfoGain = audioContext.createGain();
lfoGain.gain.value = 50; // Modulation depth in Hz
noiseNode.outputs.out.port.connect(lfoGain);
lfoGain.connect(oscillator.frequency); // Random frequency modulation

// Create snare drum sound (noise + envelope)
const noiseGain = audioContext.createGain();
noiseNode.outputs.out.port.connect(noiseGain);
noiseGain.connect(audioContext.destination);

// Short envelope for snappy sound
const now = audioContext.currentTime;
noiseGain.gain.setValueAtTime(0.5, now);
noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
noiseGain.gain.setValueAtTime(0, now + 0.1);
```

## Interface

### Inputs

The White Noise node has no inputs. It generates noise autonomously.

### Outputs

- **out**: White noise audio signal with values ranging from -1 to 1

### Methods

The node uses standard Web Audio API methods inherited from AudioWorkletNode.

## Implementation

The White Noise node is implemented using an AudioWorkletProcessor that generates random values for each audio sample. The processor uses JavaScript's `Math.random()` function to produce uniformly distributed random numbers between 0 and 1, which are then scaled to the range -1 to 1 to create bipolar audio signals.

The generation process is simple: for each sample in each output channel, a new random value is calculated using `Math.random() * 2 - 1`. This produces approximately equal energy across all frequencies up to the Nyquist frequency (half the sample rate), which is the defining characteristic of white noise.

The term "white" comes from the analogy to white light, which contains equal intensities of all visible frequencies. Similarly, white noise contains equal power per frequency across the audible spectrum. This makes it useful as a test signal for analyzing systems and as a starting point for creating various types of colored noise through filtering.

The processor generates noise continuously without any parameters or state management, making it extremely lightweight. Each channel is processed independently, allowing for stereo or multi-channel noise generation. The implementation supports any number of output channels configured by the Web Audio system.

Common applications include creating wind sounds, ocean waves, percussion (hi-hats, snares), synthesizer texture layers, and random modulation sources. When filtered, white noise can be transformed into pink noise (equal energy per octave), brown noise (more bass-heavy), or other colored variations for different timbral characteristics.
