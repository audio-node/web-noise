# Sequencer (Step Sequencer)

[Web Audio API - AudioWorkletProcessor](https://developer.mozilla.org/docs/Web/API/AudioWorkletProcessor)

## Overview

The Sequencer node is a step sequencer that plays back a programmable sequence of notes and gate states when triggered. This custom implementation creates rhythmic patterns and melodic sequences commonly used in electronic music production, drum programming, and modular synthesis. Each step in the sequence contains a gate state (on/off) and a MIDI note number.

## Usage

The Sequencer node advances through a sequence of steps when it receives gate signals, outputting the corresponding gate state, note, and current step index.

```typescript
import sequencer from './audioNode';

// Create with an AudioContext and initial sequence
const sequencerNode = await sequencer(audioContext, {
  values: {
    sequence: [
      [1, 60], // Step 1: Gate ON, Note C4 (MIDI 60)
      [1, 64], // Step 2: Gate ON, Note E4 (MIDI 64)
      [0, 67], // Step 3: Gate OFF, Note G4 (MIDI 67)
      [1, 72], // Step 4: Gate ON, Note C5 (MIDI 72)
    ]
  }
});

// Connect a clock/trigger source to advance the sequencer
const lfo = audioContext.createOscillator();
lfo.frequency.value = 4; // 4 Hz clock
lfo.connect(sequencerNode.inputs.gate.port);

// Connect outputs to control sound
sequencerNode.outputs.gate.port.connect(envelope.inputs.trigger.port);
sequencerNode.outputs.note.port.connect(midiToFreq.inputs.midi.port);

// Register a message port to receive step change events
const channel = new MessageChannel();
sequencerNode.registerPort(channel.port1);

channel.port2.addEventListener('message', (event) => {
  if (event.data.name === 'STEP_START') {
    console.log(`Step ${event.data.data} started`);
  }
});
channel.port2.start();

// Reset sequencer to beginning
const resetTrigger = audioContext.createConstantSource();
resetTrigger.offset.value = 0;
resetTrigger.connect(sequencerNode.inputs.reset.port);
resetTrigger.start();

// Update the sequence programmatically
sequencerNode.setValues({
  sequence: [
    [1, 48], // New pattern
    [1, 52],
    [1, 55],
    [0, 60],
  ]
});

// Start the clock
lfo.start();
```

## Interface

### Inputs

- **gate**: Clock signal that advances the sequencer to the next step on rising edge (threshold: 0.5)
- **reset**: Trigger signal that resets the sequencer to the beginning (threshold: 0.5)

### Outputs

- **gate**: Gate output that mirrors the input clock when the current step's gate state is 1, or outputs 0 when the step's gate state is 0
- **note**: MIDI note number from the current step
- **index**: Current step index in the sequence (0-based)

### Methods

- **registerPort(port: MessagePort)**: Registers a message port for receiving step change events (STEP_START and STEP_END)
- **setValues(values?: SequencerValues)**: Updates the sequence. Accepts an object with a `sequence` property containing an array of [gateState, midiNote] tuples.

## Implementation

The Sequencer node is implemented using an AudioWorkletProcessor that maintains an internal sequence of steps and an index pointer. Each step is represented as a tuple containing a gate state (0 or 1) and a MIDI note number.

The processor monitors the gate input for rising edges (crossing the 0.5 threshold). When a rising edge is detected, the sequencer advances to the next step, wrapping around to the beginning when it reaches the end. The reset input can be triggered to immediately return the index to the start of the sequence.

For each audio processing block, the processor outputs the current step's data across three separate output channels. The gate output passes through the input clock signal when the current step's gate state is 1, or outputs 0 when the gate state is 0, allowing for rests in the sequence. The note output continuously streams the current step's MIDI note number. The index output provides the current step position, useful for visualizing the sequencer's progress.

The sequence can be updated in real-time via the `setValues()` method, which sends a message to the processor. The processor broadcasts STEP_START and STEP_END events through a message port, enabling UI synchronization and external event handling. This design makes the Sequencer ideal for creating rhythmic patterns, melodic sequences, and complex generative compositions in modular synthesis environments.
