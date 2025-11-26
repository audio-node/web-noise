import { PluginComponent } from "@web-noise/core";
import base from "./base";
import ScriptNode from "../ScriptNode";

const Script: PluginComponent = {
  ...base,
  node: ScriptNode,
  name: "Script (Programmable Audio Processor)",
  description:
    "Executes custom JavaScript code with access to the Web Audio API, enabling creation of custom audio routing, processing algorithms, and dynamic behaviors. Features multiple inputs/outputs, trigger events, and a sandboxed execution environment.",
  info: `# Script

A programmable audio processor that executes custom JavaScript code with access to the Web Audio API and multiple audio inputs/outputs.

## Purpose

- Create custom audio routing and processing logic not available in built-in nodes
- Implement unique DSP algorithms and sound design techniques
- Build dynamic, event-driven audio behaviors
- Prototype and experiment with audio processing ideas
- Combine and orchestrate multiple audio nodes programmatically

## Values

- **Expression**: JavaScript code that executes in a sandboxed environment with access to ScriptSandbox API. The code can create audio nodes, set up connections, and register event handlers. Code is transpiled and executed asynchronously, with errors reported through the message channel.

## ScriptSandbox API

The code has access to a global \`ScriptSandbox\` object with:

- **inputs**: Array of 4 AudioWorkletNode instances for receiving audio signals
- **outputs**: Array of 4 AudioWorkletNode instances for sending processed audio
- **audioContext**: The main AudioContext for creating Web Audio API nodes
- **onTriggered(fn)**: Register callback to execute when trigger input activates (signal > threshold)
- **onUntriggered(fn)**: Register callback to execute when trigger input deactivates (signal returns to 0)

## Example

\`\`\`javascript
const { inputs, outputs, audioContext } = ScriptSandbox;

// Simple pass-through
inputs[0].connect(outputs[0]);

// Create dynamic gain control
const gain = audioContext.createGain();
gain.gain.value = 0.5;
inputs[1].connect(gain).connect(outputs[1]);

// Respond to trigger events
ScriptSandbox.onTriggered(() => {
  gain.gain.value = 1.0; // Boost volume on trigger
});

ScriptSandbox.onUntriggered(() => {
  gain.gain.value = 0.5; // Return to normal
});

// Create filter sweep on input 2
const filter = audioContext.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 1000;
inputs[2].connect(filter).connect(outputs[2]);

ScriptSandbox.onTriggered(() => {
  filter.frequency.setTargetAtTime(5000, audioContext.currentTime, 0.1);
});
\`\`\``,
  tags: [
    "programming",
    "scripting",
    "custom",
    "dynamic",
    "routing",
    "experimental",
  ],
  portsDescription: {
    inputs: {
      trigger:
        "Audio input that triggers event callbacks when signal crosses threshold",
      input0: "First audio input for custom processing",
      input1: "Second audio input for custom processing",
      input2: "Third audio input for custom processing",
      input3: "Fourth audio input for custom processing",
    },
    outputs: {
      output0: "First audio output from custom processing",
      output1: "Second audio output from custom processing",
      output2: "Third audio output from custom processing",
      output3: "Fourth audio output from custom processing",
    },
  },
  resizable: true,
  minSize: { width: 500, height: 300 },
};

export default Script;
