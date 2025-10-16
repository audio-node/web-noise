# Gate Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/ConstantSourceNode)

## Overview

The Gate node provides a user interface element (a button or a toggle switch) that outputs a constant signal of either 1 (high) or 0 (low). It serves as a manual control for triggering events or switching between states within a patch.

## Usage

The Gate node is used as a manual input source. It can be configured as a momentary trigger button or a persistent toggle switch.

```javascript
// Create a gate node
const gate = await webNoise.createNode('gate');

// Connect its output to control another node's parameter, like an envelope trigger
const adsr = await webNoise.createNode('adsr');
webNoise.connect(gate, 'out', adsr, 'trigger');

// Clicking the gate in the UI will now trigger the ADSR envelope.
```

## Interface

### Inputs

This node has no inputs. It is controlled manually through its user interface.

### Outputs

-   **out**: A signal that is high (1) when the gate is open/active and low (0) when it is closed/inactive.

## Implementation

The Gate node is implemented using a `ConstantSourceNode`. The node's UI controls the `offset` parameter of this source, setting it to `1` or `0` to produce the gate signal. The UI can be configured to behave as either a momentary button or a toggle switch.
