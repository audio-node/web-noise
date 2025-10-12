# ChannelSplitter AudioNode

A wrapper around the Web Audio API's [`ChannelSplitterNode`](https://developer.mozilla.org/en-US/docs/Web/API/ChannelSplitterNode) that separates a multi-channel audio stream into individual mono channels.

## Overview

This module provides a wrapper for the Web Audio API's channel splitter node, which is used to split a multi-channel audio stream (like stereo) into separate mono channels. It's useful for processing individual channels separately before recombining them.

## Usage

```typescript
import channelSplitter from './audioNode';

// Create with an AudioContext
const splitter = await channelSplitter(audioContext);

// Connect a stereo source to the splitter
stereoSource.outputs.out.port.connect(splitter.inputs.input.port);

// Process individual channels separately
splitter.outputs.output0.port.connect(leftProcessor.inputs.in.port); // Left channel
splitter.outputs.output1.port.connect(rightProcessor.inputs.in.port); // Right channel

// Typically used with a ChannelMerger to recombine the processed channels
```

## Interface

The channel splitter node exposes:

- `inputs.input`: Audio input port that receives multi-channel audio
- `outputs.output0`, `outputs.output1`, etc.: Multiple audio output ports, each carrying a single channel from the input

## Implementation

The channel splitter extracts individual channels from a multi-channel input. For example, from a stereo input:
- output0 provides the left channel
- output1 provides the right channel

This is particularly useful for per-channel processing, such as applying different effects to left and right channels, or for analyzing individual channels separately.