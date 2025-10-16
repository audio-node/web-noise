# MIDI Input Node

[Web MIDI API Reference](https://developer.mozilla.org/en-US/docs/Web/API/Web_MIDI_API)

## Overview

The MIDI Input node allows you to connect and receive messages from hardware MIDI devices, such as keyboards and controllers. It lists available MIDI inputs and, once a device is selected, outputs the raw MIDI message data as separate numerical signals for command, note, and velocity.

## Usage

Select a connected MIDI device from the dropdown menu in the node's UI. Once a device is active, playing notes or moving controllers on the device will send data to the node's outputs.

```javascript
// Create a MIDI Input node
const midiInput = await webNoise.createNode('midiInput');

// Connect the 'note' and 'velocity' outputs to control an oscillator
const oscillator = await webNoise.createNode('oscillator');
const midiToFreq = await webNoise.createNode('midiToFrequency');
const gain = await webNoise.createNode('gain');

// Convert MIDI note number to frequency
webNoise.connect(midiInput, 'note', midiToFreq, 'in');
webNoise.connect(midiToFreq, 'out', oscillator, 'frequency');

// Use velocity to control the gain
webNoise.connect(midiInput, 'velocity', gain, 'in');
webNoise.connect(oscillator, 'out', gain, 'in');
```

## Interface

### Inputs

This node has no data inputs. A MIDI device is selected via its user interface.

### Outputs

-   **command**: The MIDI message's status byte (e.g., 144 for Note On, 128 for Note Off).
-   **note**: The MIDI note number (0-127).
-   **velocity**: The velocity of the note (0-127). For non-note messages, this will be the third byte of the MIDI message.

## Implementation

The node uses the browser's `navigator.requestMIDIAccess()` to detect and list available MIDI devices. When a device is selected, its `onmidimessage` event is captured. The raw MIDI data from this event is sent to an `AudioWorkletProcessor`, which then places the individual bytes of the message into the corresponding output buffers, making them available for use in the audio graph.
