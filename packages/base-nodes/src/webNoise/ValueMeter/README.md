# Value Meter Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Value Meter node displays the instantaneous numerical value of an incoming signal. It's a simple yet essential utility for monitoring control signals, LFOs, or any other data stream within a patch, providing a clear, real-time digital readout.

## Usage

Connect any numerical signal to the `input` port of the Value Meter. The node's display will show the current value of the signal.

## Interface

### Inputs

-   **input**: The numerical signal to be displayed.

### Outputs

This node has no outputs.

## Implementation

The Value Meter node uses an `AudioWorkletProcessor` to efficiently capture and broadcast incoming numerical data from the audio thread to the main thread. The main thread then renders this data in a simple digital display, ensuring low latency and accurate real-time monitoring.
