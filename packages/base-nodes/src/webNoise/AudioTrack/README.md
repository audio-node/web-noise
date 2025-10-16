# Audio Track Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Audio Track node is designed to play back audio from a specified URL. It loads an audio file into a buffer and provides extensive control over its playback, including looping, playback rate, and defining specific start and end points. This makes it a versatile tool for handling audio samples, loops, and backing tracks within a Web Noise patch.

## Usage

To use the Audio Track node, you provide a URL to an audio file. Once loaded, you can control playback using the various input ports.

```javascript
// Set the audio source URL
audioTrack.setValues({ src: 'https://example.com/myaudio.wav' });

// Play the audio by sending a gate signal
const playButton = document.getElementById('play');
playButton.addEventListener('mousedown', () => {
  // Send a value > 0.5 to the 'gate' input
});
playButton.addEventListener('mouseup', () => {
  // Send a value of 0 to the 'gate' input
});

// Control playback rate
const rateSlider = document.getElementById('rate');
rateSlider.addEventListener('input', (event) => {
  // Send the slider value to the 'playbackRate' input
});
```

## Interface

### Inputs

-   **gate**: A gate signal to start (>= 0.5) and stop (< 0.5) playback.
-   **restart**: A trigger signal to reset the playback position to the start of the defined range.
-   **loop**: A boolean value (0 or 1) to enable or disable looping.
-   **start**: The start time (in seconds) of the playback range.
-   **end**: The end time (in seconds) of the playback range.
-   **detune**: The detune value (in cents) for fine-tuning the pitch.
-   **playbackRate**: The speed at which the audio is played.

### Outputs

-   **out**: The main audio output of the track.
-   **gate**: A gate signal that is high (1) when the track is playing and low (0) otherwise.
-   **duration**: The total duration of the loaded audio buffer in seconds.
-   **time**: The current playback time in seconds.

## Implementation

The node uses an `AudioWorkletProcessor` to handle audio playback with low latency. It fetches the audio file from the provided URL, decodes it into an `AudioBuffer`, and then streams the data to the output based on the control parameters. The worklet also handles interpolation for smooth pitch shifting when `playbackRate` or `detune` are adjusted.
