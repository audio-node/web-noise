# Script Node

## Overview

The Script node is a programmable audio processor that executes custom JavaScript code with access to the Web Audio API. Unlike native Web Audio nodes with fixed functionality, the Script node allows you to create custom audio routing, processing logic, and dynamic behaviors by writing JavaScript code that runs in real-time. It provides a sandbox environment with access to multiple audio inputs/outputs, trigger events, and the full AudioContext API.

## Usage

The Script node executes user-provided JavaScript code that can manipulate audio connections and create custom processing chains.

```typescript
import scriptNode from './audioNode';

// Create with an AudioContext
const script = await scriptNode(audioContext, {
  label: "custom-script",
  values: {
    expression: `
      const { inputs, outputs, audioContext } = ScriptSandbox;
      
      // Connect input 0 to output 0
      inputs[0].connect(outputs[0]);
      
      // Create a gain node for dynamic volume control
      const gain = audioContext.createGain();
      gain.gain.value = 0.5;
      
      inputs[1].connect(gain).connect(outputs[1]);
      
      // React to trigger events
      ScriptSandbox.onTriggered(() => {
        gain.gain.value = 1.0;
      });
      
      ScriptSandbox.onUntriggered(() => {
        gain.gain.value = 0.5;
      });
    `
  }
});

// Connect audio sources
oscillator.connect(script.inputs.input0.port);
audioBuffer.connect(script.inputs.input1.port);

// Connect outputs to destination
script.outputs.output0.port.connect(audioContext.destination);

// Trigger the script
trigger.connect(script.inputs.trigger.port);

// Update the script code dynamically
script.setValues({
  expression: `
    const { inputs, outputs } = ScriptSandbox;
    inputs[0].connect(outputs[0]);
  `
});
```

## Interface

### Inputs

- **trigger**: Audio input that triggers event callbacks when signal crosses threshold
- **input0**: First audio input for custom processing
- **input1**: Second audio input for custom processing
- **input2**: Third audio input for custom processing
- **input3**: Fourth audio input for custom processing

### Outputs

- **output0**: First audio output from custom processing
- **output1**: Second audio output from custom processing
- **output2**: Third audio output from custom processing
- **output3**: Fourth audio output from custom processing

### Methods

- **setValues({ expression })**: Updates the JavaScript code to execute
- **channel**: MessagePort for receiving error messages and status updates

### ScriptSandbox API

The code has access to a global `ScriptSandbox` object with the following properties:

- **inputs**: Array of 4 AudioWorkletNode instances for receiving audio
- **outputs**: Array of 4 AudioWorkletNode instances for sending audio
- **audioContext**: The main AudioContext for creating Web Audio nodes
- **onTriggered(fn)**: Register a callback function to execute when trigger input is activated
- **onUntriggered(fn)**: Register a callback function to execute when trigger input is deactivated

## Implementation

The Script node is implemented using a sandboxed JavaScript execution environment that provides safe access to Web Audio APIs. It uses AudioWorkletNodes as pass-through nodes for inputs and outputs, allowing the user's code to create arbitrary audio routing and processing chains.

The node monitors a trigger input using a dedicated trigger-watcher worklet that detects when the audio signal crosses a threshold. When triggered or untriggered, it executes registered callback functions, enabling event-driven audio processing.

The user's JavaScript code is transpiled and executed using AsyncFunction, with the ScriptSandbox object injected as a parameter. This provides a controlled environment where the code can manipulate audio connections without access to unsafe browser APIs.

When the expression is updated via `setValues`, the node automatically disconnects previous audio routing, creates fresh pass-through nodes, and re-executes the new code. Error handling is built-in, with errors communicated through the message channel for display in the UI.

The implementation uses four inputs and four outputs to provide flexibility for complex audio routing scenarios, multi-channel processing, and creative audio applications.
