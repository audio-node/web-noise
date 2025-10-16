# Audio Recorder Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Audio Recorder node allows you to record audio from an input stream into an audio buffer. Once the recording is stopped, the captured audio can be played back and downloaded as a `.wav` file. This node is useful for capturing live input, creating samples, or debugging audio signals.

## Usage

Conceptually, you can use the Audio Recorder node like this:

```javascript
// Connect an audio source to the recorder's input
const oscillator = audioContext.createOscillator();
oscillator.connect(audioRecorder.inputs.input.port);

// Start recording by sending a gate signal
const recordButton = document.getElementById('record');
recordButton.addEventListener('mousedown', () => {
  // Send a value > 0.5 to the 'record' input
});
recordButton.addEventListener('mouseup', () => {
  // Send a value of 0 to the 'record' input
});

// Play back the recorded audio
const playButton = document.getElementById('play');
playButton.addEventListener('click', () => {
    // Send a trigger signal to the 'play' input
});
```

## Interface

### Inputs

-   **input**: The audio stream to be recorded.
-   **record**: A gate signal. Recording starts when the value is high (>= 0.5) and stops when it's low.
-   **erase**: A trigger signal to clear the recorded audio buffer.
-   **play**: A gate signal to play the recorded audio.
-   **restart**: A trigger signal to restart playback from the beginning.
-   **loop**: A boolean value (0 or 1) to enable or disable looping.
-   **start**: The start time (in seconds) of the playback range.
-   **end**: The end time (in seconds) of the playback range.
-   **detune**: The detune value (in cents) for playback.
-   **playbackRate**: The playback rate for the recorded audio.

### Outputs

-   **output**: The audio output of the recorded sample during playback.

## Implementation

The Audio Recorder node is implemented using an `AudioWorkletProcessor`. It captures incoming audio chunks and stores them in an internal buffer. When recording stops, the buffer is converted to a WAV file for download. For playback, it utilizes the functionality of the `AudioTrack` node.
