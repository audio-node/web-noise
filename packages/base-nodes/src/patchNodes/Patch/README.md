# Patch (Subpatch Container)

## Overview

The Patch node is a container component that loads and embeds other patches as reusable modules within a parent patch. This enables modular patch design by allowing complex signal processing graphs to be encapsulated, saved, and reused across projects. Patches can be loaded from project files or external URLs, creating a hierarchical patch architecture.

## Usage

The Patch node loads an external patch file and creates an instance of it within the current patch. Inlet and Outlet nodes within the loaded patch define its external interface.

```typescript
import patchNode from './patchAudioNode';

// Create a Patch node with a URL to a saved patch
const patch = await patchNode(audioContext, {
  values: {
    url: 'project://patch-id-123', // Load from project
    // or
    url: 'https://example.com/my-patch.json', // Load from external URL
    
    // Override internal node values
    nodes: {
      'slider-1': { value: 0.75 },
      'oscillator-1': { frequency: 440 }
    }
  }
});

// Connect to the patch's inputs (defined by Inlet nodes)
oscillator.connect(patch.inputs.audioIn.port);

// Connect from the patch's outputs (defined by Outlet nodes)
patch.outputs.audioOut.port.connect(destination);

// The patch internally manages all its nodes and connections
// Inlet nodes inside the patch receive external signals
// Outlet nodes inside the patch send signals to the parent
```

## Interface

### Inputs

Dynamic inputs are created based on Inlet nodes within the loaded patch. Each Inlet node with a label creates a corresponding input port on the Patch instance.

### Outputs

Dynamic outputs are created based on Outlet nodes within the loaded patch. Each Outlet node with a label creates a corresponding output port on the Patch instance.

### Configuration

- **url**: URL or project reference to the patch file to load
- **patch**: Direct patch data (EditorState) instead of loading from URL
- **nodes**: Object mapping internal node IDs to value overrides

### Methods

The Patch node manages an internal audio graph with all loaded nodes and connections.

## Implementation

The Patch node is implemented as a container that loads patch data (either from a URL or directly provided), creates all the nodes defined in that patch, and establishes the connections between them. It uses the `createPatch` utility to manage the internal audio graph.

When a patch is loaded, the Patch node scans for Inlet and Outlet nodes to determine its external interface. Inlet nodes become the patch's inputs—their labels define the input port names. Outlet nodes become the patch's outputs—their labels define the output port names. This automatic interface generation allows patches to be treated as black-box modules with well-defined I/O contracts.

The Patch node maintains a registry of all audio nodes within the loaded patch. This enables the control panel to access and display controls for specific nodes marked for UI exposure. The control panel uses a grid layout to organize these exposed controls, allowing users to interact with key parameters without opening the patch.

Value overrides can be provided through the `nodes` configuration, allowing parent patches to set initial values for nodes within the subpatch. This enables parameterization and customization of reusable modules without modifying the original patch file.

The implementation supports loading patches from multiple sources: project files (using `project://` URLs), external HTTP/HTTPS URLs, or direct patch data. When loading from URLs, the patch data is fetched and parsed as JSON containing the complete editor state with nodes, edges, and configuration.

The Patch node creates a true hierarchical architecture where complex processing chains can be developed, tested, and refined independently, then embedded as modules within larger compositions. This modular approach enables code reuse, simplifies large projects, and supports collaborative workflows where different team members can work on separate patch modules.

Changes to internal node values can be propagated from the parent patch, allowing dynamic control over subpatch parameters. The control panel integration provides visual feedback and interaction with selected nodes from the embedded patch, making it easy to adjust critical parameters without navigating into the subpatch structure.
