# Audio Input Node

A wrapper around the Web Audio API's [`MediaStreamAudioSourceNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode) that captures audio from microphones and other input devices.

## Overview

This module provides access to audio input devices connected to the user's system, allowing you to capture and process audio from microphones, line inputs, and other audio sources. It automatically detects available audio input devices and handles device changes.

## Usage

```typescript
import audioInput from './audioNode';

// Create with an AudioContext
const audioInputNode = await audioInput(audioContext);

// Connect to other nodes
audioInputNode.outputs.output.port.connect(destinationNode.inputs.in.port);

// Get list of available audio input devices
const devices = audioInputNode.audioInputs;

// Select a specific input device
audioInputNode.setValues({ currentInput: devices[0].deviceId });

// Listen for device list changes
const removeListener = audioInputNode.addEventListener('message', (data) => {
  if (data.name === 'inputs-list') {
    console.log('Available audio inputs:', data.data);
  }
});

// Later, remove the event listener
removeListener();
```

## Interface

The audio input node exposes:

- `outputs.output`: Audio output port that can be connected to other audio nodes
- `audioInputs`: Array of available audio input devices (MediaDeviceInfo objects)
- `setValues({ currentInput })`: Method to select the active input device
- `addEventListener('message', callback)`: Method to listen for device list changes
- `destroy()`: Method to clean up resources

## Implementation

The audio input node uses the MediaDevices API to enumerate and access audio input devices. It creates a MediaStreamAudioSourceNode when an input device is selected and connects it to a pass-through AudioWorkletNode.

The node automatically handles device connection and disconnection events, updating the available device list and notifying listeners. When switching between input devices, it properly disconnects and stops the previous media stream before creating a new one.

The implementation uses a pass-through worklet to ensure consistent behavior with other nodes in the audio graph, even when no input device is selected or available.