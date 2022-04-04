import { Scale, Note } from "@tonaljs/tonal";

export class SequencerProcessor extends AudioWorkletProcessor {
  freqRange: Array<number>;
  currentFrequency: number;
  constructor() {
    super();
    const range = Scale.rangeOf("C major");
    this.freqRange = range("A2", "A6").map((note) => {
      return Note.freq(note || "C2") as number;
    });
    this.currentFrequency = 0;

    this.port.onmessage = (e) => {
      //@ts-ignore
      console.log(e.data.diff, +new Date() - e.data.time);
      const randomIndex = Math.floor(Math.random() * this.freqRange.length);
      this.currentFrequency = this.freqRange[randomIndex];
    };
  }

  process(inputs: any, outputs: any, parameters: any) {
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
