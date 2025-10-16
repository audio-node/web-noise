# Outlet (Patch Output)

[Web Audio API - GainNode](https://developer.mozilla.org/docs/Web/API/GainNode)

## Overview

The Outlet node is a patch boundary component that creates an output port for reusable audio patches. When a patch is encapsulated as a subpatch or module, Outlet nodes define the output connections that allow signals to flow out of the patch to the parent context. This enables modular patch design and encapsulation.

## Usage

Outlet nodes are used inside patch definitions to create output ports. They act as pass-through connections that send signals to the parent patch.

```typescript
import passThrough from '../../webNoise/PassThrough/audioNode';

// Outlet uses the same audio node as PassThrough
const outletNode = await passThrough(audioContext);

// Inside a subpatch, process the signal and send it to an Outlet
filterNode.outputs.out.port.connect(outletNode.inputs.in.port);

// In the parent patch, receive the signal from the subpatch's output
const subpatch = createPatch(...);
subpatch.outputs.audioOut.port.connect(destination);

// The Outlet node named "audioOut" sends the signal to the parent
```

## Interface

### Inputs

- **in**: Input port that receives signals from nodes within the patch

### Outputs

- **out**: Output port that forwards the signal to the parent patch context

### Methods

The node uses standard Web Audio API methods inherited from GainNode.

## Implementation

The Outlet node is implemented using a simple GainNode with gain set to 1, functioning as a unity gain pass-through. This is the same implementation used by the PassThrough and Inlet nodes—it accepts any type of signal (audio or control) and forwards it without modification.

The key distinction of Outlet nodes is their contextual role rather than their audio processing behavior. While the underlying audio node is identical to PassThrough, Outlet serves a specific purpose in patch architecture: it marks an output boundary point where signals exit an encapsulated patch to reach the parent context.

When patches are saved and reused as modules, Outlet nodes are automatically mapped to the patch's output ports. Each Outlet in a patch creates a corresponding output on the patch's external interface. This allows complex signal processing graphs to be packaged as reusable components with well-defined output contracts.

The GainNode implementation ensures zero latency and minimal CPU overhead while providing Web Audio's automatic sample rate conversion and channel mixing capabilities. The unity gain setting (1.0) means the signal passes through at full amplitude without attenuation or amplification.

Outlet nodes are essential for creating modular, hierarchical patch architectures where complex processing chains can be encapsulated and reused across projects. They work in tandem with Inlet nodes (which define patch inputs) to create complete input/output interfaces for subpatches. Together, Inlet and Outlet nodes enable the creation of self-contained, reusable audio processing modules with clearly defined external interfaces.
