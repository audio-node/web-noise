# Random Sequencer (MIDI Note Generator)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The Random Sequencer node is a trigger-based MIDI note generator that outputs random notes from a predefined scale when triggered. This custom implementation creates generative musical sequences commonly used in algorithmic composition, electronic music production, and experimental sound design. The sequencer outputs MIDI note numbers that can be used to control oscillators, samplers, and other pitch-dependent audio processors.

## Usage

The Random Sequencer node listens for trigger signals and outputs random MIDI note numbers from a pentatonic scale spanning multiple octaves.

```typescript
import randomSequencer from './audioNode';

// Create with an AudioContext
const sequencerNode = await randomSequencer(audioContext);

// Connect a trigger source (like an LFO or clock)
const lfo = audioContext.createOscillator();
lfo.frequency.value = 2; // 2 Hz trigger rate
lfo.connect(sequencerNode.inputs.trigger.port);

// Connect to a MIDI-to-frequency converter or oscillator control
sequencerNode.outputs.midi.port.connect(midiToFreqNode.inputs.midi.port);

// Register a message port to receive note change events
const channel = new MessageChannel();
sequencerNode.registerPort(channel.port1);

channel.port2.addEventListener('message', (event) => {
  if (event.data.name === 'noteChange') {
    console.log(`Note: ${event.data.note}, MIDI: ${event.data.midiNumber}`);
  }
});
channel.port2.start();

// Start the trigger
lfo.start();
```

## Interface

### Inputs

- **trigger**: Gate signal that triggers a new random note when crossing the threshold (0.5)

### Outputs

- **midi**: MIDI note number output (45-93, pentatonic scale)

### Methods

- **registerPort(port: MessagePort)**: Registers a message port for receiving note change events containing the note name and MIDI number

## Implementation

The Random Sequencer node is implemented using an AudioWorkletProcessor that monitors an incoming trigger signal and generates random MIDI note numbers when the trigger crosses a threshold of 0.5. The processor detects rising edges in the trigger signal, ensuring that each trigger pulse generates exactly one note.

The sequencer uses a predefined pentatonic scale spanning multiple octaves, with MIDI note numbers ranging from 45 (A2) to 93 (A6). When triggered, the processor selects a random note from this scale and broadcasts the selection through a message port, allowing UI components to display the current note.

The output continuously streams the current MIDI note number to all connected channels, making it suitable for controlling pitch-based audio processors. The node maintains state between triggers, holding the last generated note until a new trigger arrives. This design makes it ideal for creating generative musical patterns, random melodies, and algorithmic compositions in modular synthesis environments.
