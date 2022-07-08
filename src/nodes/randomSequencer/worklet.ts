import { Scale, Note } from "@tonaljs/tonal";

const TRIGGER_THRESHOLD = 0.5;

export class SequencerProcessor extends AudioWorkletProcessor {
  currentFrequency: number = 0;
  currentMidiNumber: number = 0;
  notesRange: Array<string | undefined>;

  lastInputValue = 0;

  constructor() {
    super();
    const range = Scale.rangeOf("C major");
    this.notesRange = range("A2", "A6");
  }

  onTick() {
    const randomIndex = Math.floor(Math.random() * this.notesRange.length);
    const note = this.notesRange[randomIndex] || "C2";
    const freq = Note.freq(note);
    if (freq) {
      this.currentFrequency = freq;
    }
    const midi = Note.midi(note);
    if (midi) {
      this.currentMidiNumber = midi;
    }
    this.port.postMessage({
      name: "noteChange",
      note: note,
      midiNumber: midi,
    });
  }

  checkTrigger(value: number) {
    if (value > TRIGGER_THRESHOLD && this.lastInputValue < TRIGGER_THRESHOLD) {
      this.onTick();
    }
    this.lastInputValue = value;
  }

  checkChannel(channel: Float32Array) {
    channel.forEach((item) => this.checkTrigger(item));
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Array<any>>
  ) {
    const input = inputs[0];
    input.forEach((channel) => this.checkChannel(channel));

    const [frequencyOutput, midiOutput] = outputs;

    frequencyOutput.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.currentFrequency;
      }
    });

    midiOutput.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.currentMidiNumber;
      }
    });

    return true;
  }
}

//@ts-ignore
registerProcessor("random-sequencer-processor", SequencerProcessor);
