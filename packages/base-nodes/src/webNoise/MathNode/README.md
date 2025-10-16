# Math Node

[Web Audio API Reference](https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode)

## Overview

The Math Node is a powerful and flexible utility that evaluates a user-defined JavaScript expression. It allows for complex mathematical operations between multiple input signals (`A`, `B`, `C`, `INPUT`) and k-rate parameters (`X`, `Y`, `Z`). The result of the expression is sent to the node's output.

## Usage

The primary feature of the Math Node is its code editor. You can write a JavaScript expression that will be evaluated for each audio sample.

```javascript
// Example: A simple crossfade between two inputs
// Connect audio sources to inputs 'A' and 'B'.
// Connect a control signal (e.g., an LFO from 0 to 1) to input 'C'.
// Expression:
(A * (1 - C)) + (B * C)

// Example: Using built-in Math functions
// Expression:
Math.sin(A * Math.PI * 2) * X
```

## Interface

### Inputs

-   **A, B, C**: Audio-rate inputs. Their values are available as variables `A`, `B`, and `C` in the expression.
-   **X, Y, Z**: K-rate (control) inputs. Their values are available as variables `X`, `Y`, and `Z`.
-   **INPUT**: The main audio-rate input, available as the `INPUT` variable.

### Outputs

-   **out**: The result of the evaluated JavaScript expression.

## Implementation

The node is implemented using an `AudioWorkletProcessor`. When the user provides an expression, it is compiled into a JavaScript function within the worklet. For each sample, this function is called with the current values of all inputs, and the return value is passed to the output. This allows for highly customized and complex signal processing with minimal overhead.
