# ADSR Envelope Generator

## Overview

The ADSR (Attack, Decay, Sustain, Release) node is a custom envelope generator that produces control signals for shaping the amplitude of audio signals over time. Unlike the native Web Audio API, which doesn't provide a dedicated envelope generator, this custom implementation creates precise envelope shapes commonly used in synthesizers and sound design.

## Usage

The ADSR node generates a control signal that can be connected to parameters like gain, filter cutoff, or other modulatable parameters.

```typescript
import adsr from './audioNode';

// Create with an AudioContext
const adsrNode = await adsr(audioContext);

// Connect to a gain node to control its amplitude
const gainNode = await gain(audioContext);
adsrNode.outputs.gain.port.connect(gainNode.inputs.gain.port);

// Set ADSR parameters
adsrNode.inputs.A.port.value = 0.1;    // Attack time in seconds
adsrNode.inputs.D.port.value = 0.2;    // Decay time in seconds
adsrNode.inputs.S.port.value = 0.7;    // Sustain level (0-1)
adsrNode.inputs.R.port.value = 0.5;    // Release time in seconds
adsrNode.inputs.attackCurve.port.value = 0.5; // Attack curve shape (0-1)

// Trigger the envelope
adsrNode.inputs.trigger.port.value = 1; // Start envelope
// Later...
adsrNode.inputs.trigger.port.value = 0; // Release envelope
```

## Interface

### Inputs

- **trigger**: Triggers the envelope when value is > 0, releases when 0
- **A**: Attack time in seconds (0-60s)
- **attackCurve**: Shape of the attack curve (0-1), where 0 is linear and 1 is exponential
- **D**: Decay time in seconds (0-60s)
- **S**: Sustain level (0-1)
- **R**: Release time in seconds (0-60s)

### Outputs

- **gain**: Envelope output signal (0-1)

### Methods

- **registerPort(port: MessagePort)**: Registers a message port for receiving envelope state updates

## Implementation

The ADSR node is implemented using an AudioWorkletProcessor that generates envelope values based on the current phase (attack, decay, sustain, or release). The processor calculates the appropriate value for each sample based on the current time and parameter values.

The attack phase uses a customizable curve shape, allowing for both linear and exponential attack characteristics. The decay phase transitions from the peak level to the sustain level. The sustain phase maintains a constant level until the trigger is released, at which point the release phase begins, gradually reducing the level to zero.

The node broadcasts its current state (including the active phase) through a message port, allowing for visual feedback in the user interface.