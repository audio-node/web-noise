# Select (Value Selector)

[Web Audio API - ConstantSourceNode](https://developer.mozilla.org/docs/Web/API/ConstantSourceNode)

## Overview

The Select node is a configurable value selector that outputs a constant signal based on user selection from predefined options. This utility node uses a ConstantSourceNode to provide static control voltages, commonly used in modular synthesis for switching between preset parameter values, selecting waveforms, or providing discrete control signals.

## Usage

The Select node maintains a constant output value determined by the currently selected option from a configurable list. The node can be reconfigured with different options and values can be changed programmatically.

```typescript
import select from './audioNode';

// Create with an AudioContext and initial configuration
const selectNode = await select(audioContext, {
  config: {
    options: [
      { key: "low", value: 100 },
      { key: "medium", value: 500 },
      { key: "high", value: 1000 }
    ],
    placeholder: "Choose frequency"
  },
  values: {
    value: "medium" // Initial selection
  }
});

// Connect to an oscillator's frequency parameter
selectNode.outputs.out.port.connect(oscillator.frequency);

// Change the selected value programmatically
selectNode.setValues({ value: "high" }); // Output becomes 1000

// Update the available options
selectNode.setConfig({
  options: [
    { key: "bass", value: 80 },
    { key: "mid", value: 440 },
    { key: "treble", value: 2000 }
  ]
});

// Select new value from updated options
selectNode.setValues({ value: "bass" }); // Output becomes 80
```

## Interface

### Inputs

The Select node has no audio inputs. Values are set through method calls.

### Outputs

- **out**: Constant signal output corresponding to the selected option's value

### Methods

- **setValues(values?: SelectValues)**: Updates the current selection. Accepts an object with a `value` property containing the key of the option to select.
- **setConfig(config?: SelectConfig)**: Updates the available options. Accepts an object with an `options` array containing objects with `key` (string) and `value` (number) properties, and an optional `placeholder` string.

## Implementation

The Select node is implemented using a native ConstantSourceNode that continuously outputs a single value. Unlike AudioWorklet-based nodes, this is a lightweight utility that leverages Web Audio API's built-in constant source capability.

The node maintains internal state for the current selection and the list of available options. When the selection changes via `setValues()`, the node looks up the corresponding numeric value from the options array and updates the ConstantSourceNode's offset parameter. If the selected key is not found in the options list, the output defaults to 0.

The `setConfig()` method allows dynamic reconfiguration of available options, making the node adaptable to different use cases. The ConstantSourceNode is started immediately upon creation, ensuring the output is always available. This design makes the Select node ideal for providing user-controlled constant values, implementing preset systems, or creating switchable parameter banks in modular synthesis patches.
