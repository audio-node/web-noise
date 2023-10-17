# PatchManager Module Documentation

This module, named `PatchManager`, provides functions and types for creating and managing audio patches used in web-based audio applications. These patches are typically constructed using various audio nodes and connections. The module simplifies the process of creating and configuring these patches, making it easier to work with web audio.

## Table of Contents
1. [Module Overview](#module-overview)
2. [Imported Types and Functions](#imported-types-and-functions)
3. [Exports](#exports)
   - [getPluginNodes](#getpluginnodes)
   - [initPatch](#initpatch)
   - [createPatchNode](#createpatchnode)
4. [Interfaces](#interfaces)
   - [SDKPatch](#sdkpatch)
   - [CreatePatchNodeProps](#createpatchnodeprops)
   - [PatchNode](#patchnode)

## Module Overview <a name="module-overview"></a>

This module, `PatchManager`, is used for creating and managing audio patches in web-based audio applications. It simplifies the process by providing functions for initializing patches and creating patch nodes. The module is built to work with the Web Noise audio framework, which is represented by types and functions imported from external modules.

## Imported Types and Functions <a name="imported-types-and-functions"></a>

The module imports several types and functions from external modules for managing audio patches:

- `WNNode` and `WNEdge` from `@web-noise/core/src/types` represent audio nodes and edges used in audio patches.
- `AudioNodeTypes` from the same module is an alias for audio node types.
- `PluginConfig` from the same module is a type representing the configuration of audio plugins.
- `createPatch` and `Patch` from `@web-noise/core/src/patch/createPatch` are used for creating audio patches.
- `plugins` is an array of audio plugins defined in a local module.

## Exports <a name="exports"></a>

This module exports several functions and types for creating and managing audio patches. Below are the main exports:

### `getPluginNodes` <a name="getpluginnodes"></a>

This function takes an array of `PluginConfig` objects and extracts the audio node creators from them. It returns an object with audio node types mapped to their respective audio node creators.

- **Parameters:**
  - `plugins` (Type: `PluginConfig[]`): An array of audio plugin configurations.

### `initPatch` <a name="initpatch"></a>

This function initializes an audio patch. It creates a new AudioContext (or uses a provided one).

- **Parameters:**
  - `audioContext` (Type: `AudioContext`, Optional): An optional parameter to specify an existing AudioContext. If not provided, a new AudioContext is created.

- **Returns:**
  - `SDKPatch` (Type: `SDKPatch`): An object containing the initialized AudioContext and the audio patch.

### `createPatchNode` <a name="createpatchnode"></a>

This function creates a patch audio node based on the provided data, which includes an array of audio nodes and edges for connections..

- **Parameters:**
  - `data` (Type: `CreatePatchNodeProps`): An object containing an array of audio nodes and edges for connections.
  - `audioContext` (Type: `AudioContext`, Optional): An optional parameter to specify an existing AudioContext. If not provided, a new AudioContext is created.

- **Returns:**
  - `PatchNode` (Type: `PatchNode`): An object containing inputs, outputs, and audio nodes for the created patch node.

## Interfaces <a name="interfaces"></a>

The module defines several interfaces for better understanding the types used within the module:

### `SDKPatch` <a name="sdkpatch"></a>

This interface represents the structure of an SDK audio patch, including an AudioContext and the patch itself.

- `audioContext` (Type: `AudioContext`): The AudioContext for the audio patch.
- `patch` (Type: `Patch`): The audio patch itself, created using the `createPatch` function.

### `CreatePatchNodeProps` <a name="createpatchnodeprops"></a>

This interface represents the properties required for creating a patch node.

- `data` (Type: `{ nodes: WNNode[]; edges: WNEdge[] }`): An object containing an array of audio nodes and an array of edges for audio connections.
- `audioContext` (Type: `AudioContext`, Optional): An optional parameter to specify an existing AudioContext. If not provided, a new AudioContext is created.

### `PatchNode` <a name="patchnode"></a>

This interface represents the structure of a patch node, including its inputs, outputs, and audio nodes.

- `inputs` (Type: `Record<string, AudioWorkletNode>`): A record of input labels mapped to corresponding AudioWorkletNode input ports.
- `outputs` (Type: `Record<string, AudioWorkletNode>`): A record of output labels mapped to corresponding AudioWorkletNode output ports.
- `audioNodes` (Type: `Patch["audioNodes"]`): The audio nodes associated with the patch node.

## Additional Exports <a name="additional-exports"></a>

In addition to the exports mentioned above, this module also re-exports `WNEdge` and `WNNode` types from `@web-noise/core/src/types` for external use.

Overall, the `PatchManager` module simplifies the creation and management of web-noise audio patches, allowing developers to work more efficiently with audio nodes and connections in web-based audio applications.
