import { Scale, Note } from "@tonaljs/tonal";

export class SequencerProcessor extends AudioWorkletProcessor {
  freqRange: Array<number>;
  counter: number;
  futureTickTime: number;
  currentFrequency: number;
  constructor() {
    super();
    const range = Scale.rangeOf("C major");
    this.freqRange = range("A2", "A6").map((note) => {
      return Note.freq(note || "C2") as number;
    });
    this.counter = 1;
    this.futureTickTime = 1;
    this.currentFrequency = 0;
  }

  static get parameterDescriptors() {
    return [
      {
        name: "tempo",
        defaultValue: 70,
        minValue: 0,
        maxValue: 300,
        automationRate: "a-rate",
      },
    ];
  }

  process(inputs: any, outputs: any, parameters: any) {
    const output = outputs[0];

    const secondsPerBeat = 60 / parameters["tempo"][0];
    const counterTimeValue = secondsPerBeat / 4;

    if (this.futureTickTime < currentTime + 0.1) {
      // console.log("This is 16th note: " + this.counter);
      this.counter = this.counter + 1;

      this.futureTickTime = this.futureTickTime + counterTimeValue;

      const randomIndex = Math.floor(Math.random() * this.freqRange.length);
      this.currentFrequency = this.freqRange[randomIndex];

      if (this.counter > 16) {
        this.counter = 1;
      }
    }

    output.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.currentFrequency;
      }
    });
    return true;
  }
}

//@ts-ignore
registerProcessor("sequencer-processor", SequencerProcessor);
