# Web Noise SDK Documentation

This sdk provides functions and types for creating and managing audio patches used in web-based audio applications. These patches are typically constructed using various audio nodes and connections. The module simplifies the process of creating and configuring these patches, making it easier to work with web audio.

## Exports <a name="exports"></a>

### `createPatchNode` <a name="createpatchnode"></a>

This function creates a patch audio node based on the provided data, which includes an array of audio nodes and edges for connections..

- **Parameters:**
  - `data` (Type: `CreatePatchNodeProps`): An object containing an array of audio nodes and edges for connections.
  - `audioContext` (Type: `AudioContext`, Optional): An optional parameter to specify an existing AudioContext. If not provided, a new AudioContext is created.

- **Returns:**
  - `PatchNode` (Type: `PatchNode`): An object containing inputs, outputs, and audio nodes for the created patch node.

## Interfaces <a name="interfaces"></a>

### `CreatePatchNodeProps` <a name="createpatchnodeprops"></a>

This interface represents the properties required for creating a patch node.

- `data` (Type: `{ nodes: WNNode[]; edges: WNEdge[] }`): An object containing an array of audio nodes and an array of edges for audio connections.
- `audioContext` (Type: `AudioContext`, Optional): An optional parameter to specify an existing AudioContext. If not provided, a new AudioContext is created.

### `PatchNode` <a name="patchnode"></a>

This interface represents the structure of a patch node, including its inputs, outputs, and audio nodes.

- `inputs` (Type: `Record<string, AudioWorkletNode>`): A record of input labels mapped to corresponding AudioWorkletNode input ports.
- `outputs` (Type: `Record<string, AudioWorkletNode>`): A record of output labels mapped to corresponding AudioWorkletNode output ports.
- `audioNodes` (Type: `Patch["audioNodes"]`): The audio nodes associated with the patch node.

