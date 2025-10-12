# Destination AudioNode

A simple wrapper around the Web Audio API's [`AudioContext.destination`](https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/destination) node. 

## Overview

This module provides a wrapper for the Web Audio API's destination node, which represents the final audio processing or rendering destination.

## Usage

```typescript
import destination from './audioNode';

// Create with an AudioContext
const destinationNode = destination(audioContext);

// Connect other nodes to the destination
someAudioNode.connect(destinationNode.inputs.in.port);
```

## Interface

The destination node exposes:

- `inputs.in`: Audio input port that accepts connections from other audio nodes

## Implementation

The implementation is minimal and simply wraps the native Web Audio API destination node, making it compatible with the Web-Noise architecture.
