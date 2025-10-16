# MIDI Note Node

## Overview

The MIDI Note node is a specialized version of the `Select` node, pre-configured with a comprehensive list of standard MIDI notes (from A0 to G#9/Ab9). It provides a convenient dropdown menu to select a specific note, and it outputs the corresponding MIDI note number (0-127) as a constant signal.

## Usage

This node is used as a static source for MIDI note values. It's ideal for situations where you need to specify a fixed pitch, such as for a sequencer step, a drone, or for testing purposes.

```javascript
// Create a MIDI Note node and select a note from its UI
const midiNote = await webNoise.createNode('midiNote', { values: { value: 69 } }); // A4

// Convert the MIDI note number to a frequency
const midiToFreq = await webNoise.createNode('midiToFrequency');
webNoise.connect(midiNote, 'out', midiToFreq, 'in');

// Connect to an oscillator
const oscillator = await webNoise.createNode('oscillator');
webNoise.connect(midiToFreq, 'out', oscillator, 'frequency');
```

## Interface

### Inputs

This node has no inputs. The note is selected via its user interface.

### Outputs

-   **out**: A constant signal representing the selected MIDI note number (e.g., 69 for A4).

## Implementation

This node is a wrapper around the `Select` node, which uses a `ConstantSourceNode`. It is pre-populated with a list of MIDI notes and their corresponding numerical values, removing the need for manual configuration.
