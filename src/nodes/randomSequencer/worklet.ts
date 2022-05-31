import { Scale, Note } from "@tonaljs/tonal";

const TRIGGER_THRESHOLD = 0.5;

export class SequencerProcessor extends AudioWorkletProcessor {
  freqRange: Array<number>;
  currentFrequency: number;

  lastInputValue = 0;

  constructor() {
    super();
    const range = Scale.rangeOf("C major");
    this.freqRange = range("A2", "A6").map((note) => {
      return Note.freq(note || "C2") as number;
    });
    this.currentFrequency = 0;
  }

  onTick() {
    const randomIndex = Math.floor(Math.random() * this.freqRange.length);
    this.currentFrequency = this.freqRange[randomIndex];
  }

  checkTrigger(value: number) {
    if (value > TRIGGER_THRESHOLD && this.lastInputValue < TRIGGER_THRESHOLD) {
      this.port.postMessage({
        name: "tick",
        eventData: { timestamp: +new Date(), currentTime },
      });
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

    const output = outputs[0];

    output.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.currentFrequency;
      }
    });
    return true;
  }
}

//@ts-ignore
registerProcessor("random-sequencer-processor", SequencerProcessor);
