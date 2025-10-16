# Audio Output Node

A wrapper around the Web Audio API's [`MediaStreamAudioDestinationNode`](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioDestinationNode) that routes audio to speakers and other output devices.

## Overview

This module provides access to audio output devices connected to the user's system, allowing you to route audio to specific speakers, headphones, or other audio outputs. It automatically detects available audio output devices and handles device changes.

## Usage

```typescript
import audioOutput from './audioNode';

// Create with an AudioContext
const audioOutputNode = await audioOutput(audioContext);

// Connect audio sources to the output
sourceNode.outputs.output.port.connect(audioOutputNode.inputs.input.port);

// Get list of available audio output devices
const devices = audioOutputNode.audioOutputs;

// Select a specific output device
audioOutputNode.setValues({ currentOutput: devices[0].deviceId });

// Listen for device list changes
const removeListener = audioOutputNode.addEventListener('list', (devices) => {
  console.log('Available audio outputs:', devices);
});

// Later, remove the event listener
removeListener();
```

## Interface

The audio output node exposes:

- `inputs.input`: Audio input port that receives audio signals to be routed to the selected output device
- `audioOutputs`: Array of available audio output devices (MediaDeviceInfo objects)
- `setValues({ currentOutput })`: Method to select the active output device
- `addEventListener('list', callback)`: Method to listen for device list changes

## Implementation

The audio output node uses the MediaDevices API to enumerate and access audio output devices. It creates a MediaStreamAudioDestinationNode and connects it to an Audio element, which is then routed to the selected output device using the `setSinkId` method.

The node automatically handles device connection and disconnection events, updating the available device list and notifying listeners. When switching between output devices, it properly updates the audio routing without interrupting playback.

The implementation uses the Web Audio API's destination node in combination with the Audio Output Devices API to provide flexible output routing capabilities.