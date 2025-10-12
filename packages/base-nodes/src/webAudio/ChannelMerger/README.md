# ChannelMerger AudioNode

A wrapper around the Web Audio API's [`ChannelMergerNode`](https://developer.mozilla.org/en-US/docs/Web/API/ChannelMergerNode) that combines multiple mono audio channels into a single multi-channel stream.

## Overview

This module provides a wrapper for the Web Audio API's channel merger node, which is used to combine multiple mono input channels into a single multi-channel output. It's useful for creating stereo or surround sound from separate mono sources.

## Usage

```typescript
import channelMerger from './audioNode';

// Create with an AudioContext
const merger = await channelMerger(audioContext);

// Connect mono sources to different input channels
leftSource.outputs.out.port.connect(merger.inputs.input0.port);
rightSource.outputs.out.port.connect(merger.inputs.input1.port);

// Connect the merged output to a destination
merger.outputs.output.port.connect(destinationNode.inputs.in.port);
```

## Interface

The channel merger node exposes:

- `inputs.input0`, `inputs.input1`, etc.: Multiple audio input ports for each channel to be merged
- `outputs.output`: Audio output port with the combined multi-channel signal

## Implementation

The channel merger creates a multi-channel output from separate mono inputs. Each input is assigned to a specific channel in the output. For example, in a stereo setup:
- input0 becomes the left channel
- input1 becomes the right channel

This is particularly useful for spatial audio processing and creating stereo effects from mono sources.