# Convolver AudioNode

A wrapper around the Web Audio API's [`ConvolverNode`](https://developer.mozilla.org/en-US/docs/Web/API/ConvolverNode) that applies convolution effects to audio signals, typically used for reverb and spatial effects.

## Overview

This module provides a wrapper for the Web Audio API's convolver node, which is used to apply linear convolution effects to audio signals. It's commonly used to create realistic reverb effects by using impulse response samples from real spaces.

## Usage

```typescript
import convolver from './audioNode';

// Create with an AudioContext and optional initial data
const conv = await convolver(audioContext, { 
  values: { url: 'path/to/impulse-response.wav' } 
});

// Connect audio source to the convolver
sourceNode.outputs.out.port.connect(conv.inputs.input.port);

// Connect convolver output to destination
conv.outputs.output.port.connect(destinationNode.inputs.in.port);

// Change the impulse response
conv.setValues({ url: 'path/to/different-impulse.wav' });

// Register a port for receiving buffer data (for visualization)
const channel = new MessageChannel();
conv.registerPort(channel.port1);
channel.port2.onmessage = (event) => {
  // Process buffer data for visualization
  console.log(event.data);
};
```

## Interface

The convolver node exposes:

- `inputs.input`: Audio input port that receives audio signals to be processed
- `outputs.output`: Audio output port with the convolved (processed) signal
- `setValues({ url })`: Method to load a new impulse response from a URL
- `registerPort(port)`: Method to register a MessagePort for receiving buffer data

## Implementation

The convolver node applies the acoustic characteristics of the loaded impulse response to the input signal. This creates effects like reverb, echo, or spatial positioning. The impulse response is typically a short audio recording of a sound in a specific acoustic environment, like a concert hall, cathedral, or other space with distinctive acoustic properties.