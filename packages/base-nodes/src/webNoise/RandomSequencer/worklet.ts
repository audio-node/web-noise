import { useBroadcast } from "../../lib/useBroadcast";
import notes from "../MidiNote/notes";
import notesRange from "./notesRange";
import { NoteChangeEvent } from "./types";

const notesRecord = notes.reduce<Record<number, string>>(
  (acc, { key, value }) => ({ ...acc, [value]: key }),
  {},
);

const TRIGGER_THRESHOLD = 0.5;

export class SequencerProcessor extends AudioWorkletProcessor {
  currentMidiNumber: number = 0;
  notesRange: typeof notesRange;

  lastInputValue = 0;

  broadcast = useBroadcast(this.port);

  constructor() {
    super();
    this.notesRange = notesRange;
    this.port.start();

    this.port.addEventListener(
      "message",
      ({ data }: MessageEvent<{ name: string }>) => {
        if (data.name === "GET_CURRENT_NOTE") {
          const midiNumber = this.currentMidiNumber;
          const note = notesRecord[midiNumber];
          this.broadcast<NoteChangeEvent>({
            name: "noteChange",
            note,
            midiNumber,
          });
        }
      },
    );
  }

  onTick() {
    const randomIndex = Math.floor(Math.random() * this.notesRange.length);
    const midiNumber = this.notesRange[randomIndex] || 60;
    const note = notesRecord[midiNumber];
    if (midiNumber) {
      this.currentMidiNumber = midiNumber;
    }
    this.broadcast<NoteChangeEvent>({
      name: "noteChange",
      note,
      midiNumber,
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
