# Slider (Control Value)

[Web Audio API - ConstantSourceNode](https://developer.mozilla.org/docs/Web/API/ConstantSourceNode)

## Overview

The Slider node is a user-controlled constant value generator that outputs a continuous signal based on a slider interface. This utility node uses a ConstantSourceNode to provide adjustable control voltages, commonly used in modular synthesis for manual parameter control, creating automation curves, or providing static values that can be modulated by other sources.

## Usage

The Slider node maintains a constant output value that can be adjusted through a user interface or programmatically via the `setValues()` method. The value can also be modulated through the offset input.

```typescript
import slider from './audioNode';

// Create with an AudioContext and initial value
const sliderNode = await slider(audioContext, {
  values: {
    value: 0.5 // Initial value
  },
  config: {
    min: 0,
    max: 1,
    step: 0.01,
    isVertical: false,
    showScale: true
  }
});

// Connect to control an oscillator's frequency
sliderNode.outputs.output.port.connect(oscillator.frequency);

// Change the value programmatically
sliderNode.setValues({ value: 0.75 });

// Modulate the offset with an LFO
const lfo = audioContext.createOscillator();
lfo.frequency.value = 2;
const lfoGain = audioContext.createGain();
lfoGain.gain.value = 0.1; // Modulation depth
lfo.connect(lfoGain);
lfoGain.connect(sliderNode.inputs.offset.port);
lfo.start();

// The output will be the base value (0.75) plus LFO modulation (±0.1)
```

## Interface

### Inputs

- **offset**: AudioParam that can be modulated by external sources. The output is the sum of the slider value and any connected modulation sources.

### Outputs

- **output**: Constant signal output with the current slider value plus any offset modulation

### Methods

- **setValues(values?: SliderValues)**: Updates the slider value. Accepts an object with a `value` property containing the desired output level.

## Implementation

The Slider node is implemented using a native ConstantSourceNode that continuously outputs a single value. The ConstantSourceNode's offset parameter is exposed as an input, allowing external sources to modulate the base value set by the slider.

The node maintains the current slider value through the ConstantSourceNode's offset parameter. When the user adjusts the slider or calls `setValues()`, the offset parameter is updated, immediately affecting the output. The ConstantSourceNode is started upon creation, ensuring the output is always available.

The offset input is an AudioParam, which means it supports both a-rate (audio-rate) and k-rate (control-rate) modulation. This allows for smooth modulation of the slider value by connecting LFOs, envelopes, or other modulation sources. The final output is the sum of the base slider value and any connected modulation signals.

The configurable range (min/max) and step size parameters affect only the UI behavior and do not limit the actual output value, which can exceed the configured range through modulation. This design makes the Slider node ideal for providing user-controlled values, creating manual automation, or serving as a base value for modulated parameters in modular synthesis patches.
