# Data Recorder Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Data Recorder node is a utility for capturing raw numerical data streams from up to two inputs. Unlike the Audio Recorder, which is designed for audio signals, this node records any floating-point data, such as control voltage (CV), sensor readings, or other modulation signals. The recorded data can be downloaded as a JSON file for analysis, visualization, or external processing.

## Usage

Connect one or two data sources to the inputs and use a gate signal to control the recording.

```javascript
// Connect a data source (e.g., an LFO) to the recorder
const lfo = await webNoise.createNode('oscillator', { values: { frequency: 1 } });
webNoise.connect(lfo, 'out', dataRecorder, '0');

// Use a button to control recording
const recordButton = document.getElementById('record');
recordButton.addEventListener('mousedown', () => {
  // Send a value > 0.5 to the 'gate' input to start recording
});
recordButton.addEventListener('mouseup', () => {
  // Send a value of 0 to the 'gate' input to stop recording
});

// The recorded data can then be downloaded from the node's UI.
```

## Interface

### Inputs

-   **gate**: A gate signal to start (>= 0.5) and stop (< 0.5) the recording.
-   **0**: The first data stream to record.
-   **1**: The second data stream to record.

### Outputs

This node has no audio or data outputs. The recorded data is accessed via download.

## Implementation

The Data Recorder uses an `AudioWorkletProcessor` to capture data from its inputs with sample-accurate timing. When the `gate` signal is high, it collects the incoming data into an internal buffer. When the gate goes low, it finalizes the recording and makes it available for download.
