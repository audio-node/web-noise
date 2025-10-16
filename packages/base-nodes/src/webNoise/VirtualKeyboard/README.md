# Virtual Keyboard (MIDI Controller)

[Web Audio API - ConstantSourceNode](https://developer.mozilla.org/docs/Web/API/ConstantSourceNode)

## Overview

The Virtual Keyboard node is a MIDI controller interface that generates note-on and note-off commands through an interactive keyboard display. This utility node uses ConstantSourceNodes to output MIDI command messages, note numbers, and velocity values, commonly used in music production for triggering synthesizers, samplers, and virtual instruments with mouse or touch input.

## Usage

The Virtual Keyboard node provides an interactive interface for playing musical notes. It outputs MIDI-style command, note, and velocity signals that can control sound generators.

```typescript
import virtualKeyboard from './audioNode';

// Create with an AudioContext and configuration
const keyboardNode = await virtualKeyboard(audioContext, {
  config: {
    firstNote: 60, // C4 (Middle C)
    keyboardSize: 12 // One octave
  }
});

// Connect outputs to control a synthesizer
keyboardNode.outputs.command.port.connect(synthNode.inputs.command.port);
keyboardNode.outputs.note.port.connect(synthNode.inputs.note.port);
keyboardNode.outputs.valocity.port.connect(synthNode.inputs.velocity.port);

// Programmatically play a note (MIDI note number)
keyboardNode.play(60); // Note on: C4, velocity 127
// Outputs: command=144 (note on), note=60, velocity=127

// Stop the note
keyboardNode.stop(60); // Note off: C4
// Outputs: command=128 (note off), note=60, velocity=127

// Direct access to constant source nodes (alternative)
keyboardNode.gate.offset.connect(envelope.inputs.trigger.port);
keyboardNode.frequency.offset.connect(oscillator.frequency);
keyboardNode.midi.offset.connect(midiProcessor.inputs.midi.port);

// Play a melody programmatically
const melody = [60, 64, 67, 72]; // C major arpeggio
melody.forEach((note, index) => {
  setTimeout(() => {
    keyboardNode.play(note);
    setTimeout(() => keyboardNode.stop(note), 200);
  }, index * 250);
});
```

## Interface

### Inputs

The Virtual Keyboard node has no audio inputs. Notes are triggered through UI interaction or the `play()` and `stop()` methods.

### Outputs

- **command**: MIDI command output (144 for note-on, 128 for note-off)
- **note**: MIDI note number output (0-127)
- **valocity**: MIDI velocity output (currently always 127)

### Methods

- **play(note: number)**: Triggers a note-on event with the specified MIDI note number. Sets command to 144 (note-on), note to the specified value, and velocity to 127.
- **stop(note: number)**: Triggers a note-off event with the specified MIDI note number. Sets command to 128 (note-off), note to the specified value, and velocity to 127.

### Properties

- **gate**: Direct access to the command ConstantSourceNode for alternative connection patterns
- **frequency**: Direct access to the note ConstantSourceNode for alternative connection patterns
- **midi**: Direct access to the velocity ConstantSourceNode for alternative connection patterns

## Implementation

The Virtual Keyboard node is implemented using three native ConstantSourceNodes that output MIDI-style control signals. Unlike AudioWorklet-based nodes, this is a lightweight controller that leverages Web Audio API's built-in constant sources.

The node maintains three separate constant sources: one for MIDI commands (note-on/note-off), one for note numbers, and one for velocity values. When a note is played via the UI or the `play()` method, the command source is set to 144 (MIDI note-on), the note source is set to the MIDI note number (0-127), and the velocity source is set to 127 (maximum velocity). When a note is stopped, the command is set to 128 (MIDI note-off) while maintaining the note number and velocity.

The keyboard uses MIDI standard values: command 144 (0x90) represents note-on messages, and command 128 (0x80) represents note-off messages. The note output corresponds to standard MIDI note numbers where 60 is Middle C (C4), and each increment represents one semitone. The velocity is currently fixed at 127 (maximum) but follows MIDI convention (0-127 range).

The `setValueAtTime()` method is used to schedule parameter changes, ensuring precise timing synchronized with the audio context's clock. The node exposes direct access to the underlying ConstantSourceNode objects (gate, frequency, midi) for advanced connection scenarios where you might want to access the offset parameters directly.

The configurable keyboard size and starting note allow the interface to cover different octave ranges. All three ConstantSourceNodes are started immediately upon creation, ensuring outputs are always available. This design makes the Virtual Keyboard ideal for interactive musical performance, MIDI control, and triggering note-based sound generators in modular synthesis environments.
