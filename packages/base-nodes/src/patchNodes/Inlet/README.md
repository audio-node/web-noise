# Inlet (Patch Input)

[Web Audio API - GainNode](https://developer.mozilla.org/docs/Web/API/GainNode)

## Overview

The Inlet node is a patch boundary component that creates an input port for reusable audio patches. When a patch is encapsulated as a subpatch or module, Inlet nodes define the input connections that allow signals to flow into the patch from the parent context. This enables modular patch design and encapsulation.

## Usage

Inlet nodes are used inside patch definitions to create input ports. They act as pass-through connections that receive signals from the parent patch.

```typescript
import passThrough from '../../webNoise/PassThrough/audioNode';

// Inlet uses the same audio node as PassThrough
const inletNode = await passThrough(audioContext);

// Inside a patch, the inlet receives signals from the parent
// Parent patch:
const subpatch = createPatch(...);
oscillator.connect(subpatch.inputs.audioIn.port);

// Inside the subpatch, an Inlet node named "audioIn" receives this signal
inletNode.outputs.out.port.connect(filterNode.inputs.in.port);
```

## Interface

### Inputs

- **in**: Input port that receives signals from the parent patch context

### Outputs

- **out**: Output port that forwards the received signal to nodes within the patch

### Methods

The node uses standard Web Audio API methods inherited from GainNode.

## Implementation

The Inlet node is implemented using a simple GainNode with gain set to 1, functioning as a unity gain pass-through. This is the same implementation used by the PassThrough node—it accepts any type of signal (audio or control) and forwards it without modification.

The key distinction of Inlet nodes is their contextual role rather than their audio processing behavior. While the underlying audio node is identical to PassThrough, Inlet serves a specific purpose in patch architecture: it marks an input boundary point where external signals enter an encapsulated patch.

When patches are saved and reused as modules, Inlet nodes are automatically mapped to the patch's input ports. Each Inlet in a patch creates a corresponding input on the patch's external interface. This allows complex signal processing graphs to be packaged as reusable components with well-defined input contracts.

The GainNode implementation ensures zero latency and minimal CPU overhead while providing Web Audio's automatic sample rate conversion and channel mixing capabilities. The unity gain setting (1.0) means the signal passes through at full amplitude without attenuation or amplification.

Inlet nodes are essential for creating modular, hierarchical patch architectures where complex processing chains can be encapsulated and reused across projects. They work in tandem with Outlet nodes (which define patch outputs) to create complete input/output interfaces for subpatches.
