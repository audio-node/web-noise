# Spectroscope (Frequency Analyzer)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The Spectroscope node is a real-time frequency spectrum analyzer that visualizes the frequency content of audio signals. This custom implementation uses Fast Fourier Transform (FFT) to convert time-domain audio into frequency-domain data, commonly used in audio production, mixing, sound design, and educational applications to understand and visualize harmonic content and spectral characteristics.

## Usage

The Spectroscope node analyzes incoming audio and broadcasts frequency spectrum data through a message port for visualization. It performs FFT analysis at configurable window sizes.

```typescript
import spectroscope from './audioNode';

// Create with an AudioContext
const spectroscopeNode = await spectroscope(audioContext, {
  config: {
    backgroundColor: "#1a1a1a",
    inputColor: "#00ff00",
    size: { width: 280, height: 150 }
  }
});

// Connect an audio source to analyze
const oscillator = audioContext.createOscillator();
oscillator.frequency.value = 440; // A4
oscillator.connect(spectroscopeNode.inputs.input.port);

// Set FFT size (must be power of 2)
spectroscopeNode.inputs.fftSize.port.value = 2048; // Default
// Other common values: 512, 1024, 4096, 8192

// Register a message port to receive spectrum data
const channel = new MessageChannel();
spectroscopeNode.registerPort(channel.port1);

channel.port2.addEventListener('message', (event) => {
  const { phasors, frequencies, magnitudes } = event.data;
  // phasors: Array of [real, imaginary] complex number pairs
  // frequencies: Uint8Array of frequency values in Hz
  // magnitudes: Uint8Array of magnitude values for each frequency bin
  
  // Use this data to draw frequency spectrum visualization
  console.log(`Frequencies:`, frequencies);
  console.log(`Magnitudes:`, magnitudes);
});
channel.port2.start();

// Start the oscillator
oscillator.start();
```

## Interface

### Inputs

- **input**: Audio signal to be analyzed for frequency content
- **fftSize**: FFT window size parameter (default: 2048). Must be a power of 2. Larger values provide better frequency resolution but lower time resolution.

### Outputs

The Spectroscope node has no audio outputs. It is a visualization/analysis tool only.

### Methods

- **registerPort(port: MessagePort)**: Registers a message port for receiving FFT analysis data containing phasors, frequencies, and magnitudes arrays.

## Implementation

The Spectroscope node is implemented using an AudioWorkletProcessor that performs real-time Fast Fourier Transform (FFT) analysis on incoming audio. The processor maintains an internal buffer that accumulates audio samples until it reaches the configured FFT window size.

When the buffer is full, the processor performs an FFT operation using the fft-js library, converting the time-domain audio samples into frequency-domain phasors (complex numbers representing magnitude and phase). The processor then extracts frequency values and magnitudes from the phasors and broadcasts this data through a message port.

The FFT size parameter controls the analysis window size, affecting the trade-off between frequency resolution and time resolution. Larger FFT sizes (e.g., 4096, 8192) provide better frequency resolution, allowing you to distinguish between closely-spaced frequencies, but update less frequently. Smaller FFT sizes (e.g., 512, 1024) update more frequently but have coarser frequency resolution.

The processor broadcasts three arrays: phasors (array of [real, imaginary] complex number pairs), frequencies (Uint8Array of frequency values in Hz for each bin), and magnitudes (Uint8Array of amplitude values for each frequency bin). When no input is connected, the processor broadcasts empty arrays to signal the absence of audio.

The spectroscope is a pass-through analyzer—it does not modify the audio signal and has no audio output. It's designed purely for visualization and analysis purposes. The broadcast data can be used by UI components to render real-time frequency spectrum visualizations, showing the harmonic content, fundamental frequencies, and overtones present in the audio signal.
