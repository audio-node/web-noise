import { Scale, Note } from "@tonaljs/tonal";

export class SequencerProcessor extends AudioWorkletProcessor {
  freqRange: Array<number>;
  constructor() {
    super();
    const range = Scale.rangeOf("C major");
    this.freqRange = range("A2", "A6").map((note) => {
      return Note.freq(note || "C2") as number;
    });
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
    console.log(parameters);
    const output = outputs[0];
    output.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        const tempo =
          parameters["tempo"].length > 1
            ? parameters["tempo"][i]
            : parameters["tempo"][0];
        channel[i] = tempo;
      }
    });
    return true;
  }
}

//@ts-ignore
registerProcessor("sequencer-processor", SequencerProcessor);
