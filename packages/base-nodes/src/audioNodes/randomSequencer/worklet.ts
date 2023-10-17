import notes from "../../MidiNote/notes";
import notesRange from "./notesRange";

const notesRecord = notes.reduce<Record<string, number>>(
  (acc, { key, value }) => ({ ...acc, [key]: value }),
  {},
);

const TRIGGER_THRESHOLD = 0.5;

export class SequencerProcessor extends AudioWorkletProcessor {
  currentMidiNumber: number = 0;
  notesRange: Array<string | undefined>;

  lastInputValue = 0;

  constructor() {
    super();
    this.notesRange = notesRange;
  }

  onTick() {
    const randomIndex = Math.floor(Math.random() * this.notesRange.length);
    const note = this.notesRange[randomIndex] || "C2";
    const midi = notesRecord[note];
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

  process(inputs: Float32Array[][], outputs: Float32Array[][]) {
    const input = inputs[0];
    input.forEach((channel) => this.checkChannel(channel));

    const [midiOutput] = outputs;

    midiOutput.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.currentMidiNumber;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("random-sequencer-processor", SequencerProcessor);
} catch (e) {}
