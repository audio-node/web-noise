# Clock Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Clock node generates a steady stream of trigger signals at a tempo defined in beats per minute (BPM). It is a fundamental building block for creating rhythmic patterns, sequencing events, and synchronizing different parts of a patch. The duty cycle of the clock's pulse wave can also be adjusted.

## Usage

The Clock node is typically used to drive sequencers, envelope generators, or any other node that requires a rhythmic trigger.

```javascript
// Create a clock and set its tempo
const clock = await webNoise.createNode('clock', { values: { bpm: 120 } });

// Connect the clock's trigger output to another node
const sequencer = await webNoise.createNode('sequencer');
webNoise.connect(clock, 'trigger', sequencer, 'gate');
```

## Interface

### Inputs

-   **bpm**: The tempo of the clock in beats per minute.
-   **duty**: The duty cycle of the output pulse wave, ranging from 0 to 0.99. A value of 0.5 produces a square wave.

### Outputs

-   **trigger**: A trigger signal that outputs a pulse at the specified BPM.

## Implementation

The Clock node is implemented as an `AudioWorkletProcessor`. It generates a pulse wave based on the current `currentTime` of the `AudioContext` and the provided `bpm` and `duty` parameters. This ensures that the clock is sample-accurate and remains synchronized with the audio processing thread.
