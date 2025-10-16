# Worklet Script Node

[AudioWorkletProcessor Documentation](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor)

## Overview

The Worklet Script node is a high-performance audio processor that executes custom JavaScript code directly in the audio rendering thread using the AudioWorklet API. Unlike the Script node which operates at control rate, Worklet Script processes audio at sample rate, enabling precise per-sample manipulation of audio signals. It provides access to audio inputs, outputs, and parameters with both k-rate (control rate) and a-rate (audio rate) automation, making it ideal for implementing custom DSP algorithms, audio effects, and synthesis techniques.

## Usage

The Worklet Script node executes user-provided JavaScript code in an AudioWorkletProcessor, processing 128-sample blocks of audio data.

```typescript
import workletScriptNode from './audioNode';

// Create with an AudioContext
const worklet = await workletScriptNode(audioContext, {
  label: "custom-worklet",
  values: {
    expression: `
      const { inputs, outputs, parameters } = ProcessSandbox;
      
      // Simple gain effect
      const input = inputs[0];
      const output = outputs[0];
      const gainValue = parameters.A[0];
      
      for (let channel = 0; channel < input.length; channel++) {
        const inputChannel = input[channel];
        const outputChannel = output[channel];
        
        for (let i = 0; i < inputChannel.length; i++) {
          outputChannel[i] = inputChannel[i] * gainValue;
        }
      }
    `
  }
});

// Connect audio source
oscillator.connect(worklet.inputs.input0.port);

// Connect parameter controls
lfo.connect(worklet.inputs.A.port); // a-rate parameter
slider.connect(worklet.inputs.X.port); // k-rate parameter

// Connect output to destination
worklet.outputs.output0.port.connect(audioContext.destination);

// Update the worklet code dynamically
worklet.setValues({
  expression: `
    const { inputs, outputs } = ProcessSandbox;
    const input = inputs[0][0];
    const output = outputs[0][0];
    
    for (let i = 0; i < input.length; i++) {
      output[i] = Math.tanh(input[i] * 2); // Soft clipping distortion
    }
  `
});
```

## Interface

### Inputs

- **input0**: First audio input (stereo)
- **input1**: Second audio input (stereo)
- **A**: Audio-rate parameter input (processes at sample rate)
- **B**: Audio-rate parameter input (processes at sample rate)
- **C**: Audio-rate parameter input (processes at sample rate)
- **X**: Control-rate parameter input (processes at block rate)
- **Y**: Control-rate parameter input (processes at block rate)
- **Z**: Control-rate parameter input (processes at block rate)

### Outputs

- **output0**: First audio output (stereo)
- **output1**: Second audio output (stereo)
- **output2**: Third audio output (stereo)
- **output3**: Fourth audio output (stereo)

### Methods

- **setValues({ expression })**: Updates the JavaScript code to execute in the audio worklet
- **channel**: MessagePort for receiving error messages and status updates

### ProcessSandbox API

The code has access to a global `ProcessSandbox` object with the following properties:

- **inputs**: Array of 2 Float32Array[] for audio inputs (each can be multi-channel)
- **outputs**: Array of 4 Float32Array[] for audio outputs (each can be multi-channel)
- **parameters**: Object containing Float32Array values for parameters (A, B, C, X, Y, Z)
- **currentFrame**: Integer representing the current sample frame being processed
- **currentTime**: Double representing the current audio context time
- **sampleRate**: Float representing the audio context sample rate

## Implementation

The Worklet Script node is implemented using the AudioWorklet API, which runs JavaScript code in a separate high-priority audio rendering thread. This ensures consistent, glitch-free audio processing even when the main thread is busy with UI updates or other tasks.

The node provides 2 audio inputs and 4 audio outputs, each supporting multi-channel audio (typically stereo). It also provides 6 parameter inputs: 3 audio-rate (a-rate) parameters that can change at sample rate, and 3 control-rate (k-rate) parameters that change at block rate (every 128 samples).

Audio-rate parameters (A, B, C) are ideal for audio-frequency modulation, while control-rate parameters (X, Y, Z) are more efficient for slower control signals like LFO modulation or user interface controls.

The user's JavaScript code is transpiled and compiled into a Function that executes for every 128-sample audio block. The code receives the ProcessSandbox object containing the current audio data, parameters, and timing information. This allows for precise per-sample manipulation of audio signals.

Error handling is built-in with a mechanism to prevent flooding the console with repeated errors. When an error occurs, it's sent once to the main thread via the message port and displayed in the UI. Subsequent identical errors are suppressed until a different error occurs or the code successfully executes again.

The worklet processes audio continuously as long as the node exists, returning `true` from the process method to indicate it should remain active. This makes it suitable for both audio effects (processing existing signals) and audio generators (creating new signals from scratch).

## Performance Considerations

- Code runs in the audio rendering thread at high priority
- Keep processing efficient to avoid audio glitches (aim for < 3ms per 128-sample block at 44.1kHz)
- Avoid allocations, object creation, or complex operations in the processing loop
- Use typed array operations for best performance
- a-rate parameters provide 128 values per block; k-rate parameters provide 1 value per block
- Consider using k-rate parameters when sample-accurate automation isn't needed
