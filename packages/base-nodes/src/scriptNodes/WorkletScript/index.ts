import { PluginComponent } from "@web-noise/core";
import base from "./base";
import ScriptNode from "../ScriptNode";

const WorkletScript: PluginComponent = {
  ...base,
  node: ScriptNode,
  name: "Worklet Script (Audio-Rate Processor)",
  description: "Executes custom JavaScript code directly in the audio rendering thread using AudioWorklet API. Processes audio at sample rate with access to audio inputs, outputs, and both audio-rate and control-rate parameters. Ideal for implementing custom DSP algorithms and high-performance audio effects.",
  info: `# Worklet Script

A high-performance audio processor that executes custom JavaScript code in the audio rendering thread, processing audio at sample rate using the AudioWorklet API.

## Purpose

- Implement custom DSP algorithms with per-sample precision
- Create unique audio effects and synthesis techniques
- Process audio with minimal latency in the audio thread
- Build performance-critical audio processors
- Utilize both audio-rate and control-rate parameter automation

## Values

- **Expression**: JavaScript code that executes in an AudioWorkletProcessor for every 128-sample block. The code has access to the ProcessSandbox API with audio inputs/outputs, parameters, and timing information. Code is transpiled and runs continuously in the audio rendering thread with built-in error handling.

## ProcessSandbox API

The code has access to a global \`ProcessSandbox\` object with:

- **inputs**: Array of 2 Float32Array[] representing audio inputs (input0, input1), each can be multi-channel
- **outputs**: Array of 4 Float32Array[] representing audio outputs (output0-3), each can be multi-channel
- **parameters**: Object with Float32Array values for automation parameters:
  - **A, B, C**: Audio-rate (a-rate) parameters - 128 values per block for sample-accurate modulation
  - **X, Y, Z**: Control-rate (k-rate) parameters - 1 value per block for efficient control signals
- **currentFrame**: Integer sample-frame counter for the audio block being processed
- **currentTime**: Double representing the current audio context time in seconds
- **sampleRate**: Float representing the audio context sample rate (typically 44100 or 48000)

## Example

\`\`\`javascript
const { inputs, outputs, parameters } = ProcessSandbox;

// Get input and output channels
const inputL = inputs[0][0]; // Left channel of first input
const inputR = inputs[0][1]; // Right channel of first input
const outputL = outputs[0][0];
const outputR = outputs[0][1];

// Get parameters
const gain = parameters.A; // a-rate: 128 values
const mix = parameters.X[0]; // k-rate: single value per block

// Process each sample
for (let i = 0; i < inputL.length; i++) {
  // Soft clipping distortion
  const distortedL = Math.tanh(inputL[i] * 3);
  const distortedR = Math.tanh(inputR[i] * 3);
  
  // Apply gain automation
  const processedL = distortedL * gain[i];
  const processedR = distortedR * gain[i];
  
  // Mix with dry signal
  outputL[i] = inputL[i] * (1 - mix) + processedL * mix;
  outputR[i] = inputR[i] * (1 - mix) + processedR * mix;
}

// Copy processed signal to additional outputs
outputs[1][0].set(outputL);
outputs[1][1].set(outputR);
\`\`\`

## Performance Tips

- Keep code efficient: aim for < 3ms per 128-sample block
- Avoid allocations and object creation in the processing loop
- Use k-rate parameters for control signals to reduce CPU usage
- Use a-rate parameters only when sample-accurate automation is needed
- Leverage typed array operations for best performance`,
  tags: ["worklet", "dsp", "sample-rate", "audio-thread", "performance", "synthesis", "effects"],
  portsDescription: {
    inputs: {
      input0: "First audio input (stereo)",
      input1: "Second audio input (stereo)",
      A: "Audio-rate parameter (a-rate) - 128 values per block for sample-accurate modulation",
      B: "Audio-rate parameter (a-rate) - 128 values per block for sample-accurate modulation",
      C: "Audio-rate parameter (a-rate) - 128 values per block for sample-accurate modulation",
      X: "Control-rate parameter (k-rate) - 1 value per block for efficient control signals",
      Y: "Control-rate parameter (k-rate) - 1 value per block for efficient control signals",
      Z: "Control-rate parameter (k-rate) - 1 value per block for efficient control signals"
    },
    outputs: {
      output0: "First audio output (stereo)",
      output1: "Second audio output (stereo)",
      output2: "Third audio output (stereo)",
      output3: "Fourth audio output (stereo)"
    }
  }
};

export default WorkletScript;
