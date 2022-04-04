export class ClockProcessor extends AudioWorkletProcessor {
  counter: number;
  futureTickTime: number | null;
  constructor() {
    super();
    this.counter = 1;
    this.futureTickTime = null;
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

  process(_inputs: any, _outputs: any, parameters: any) {
    const secondsPerBeat = 60 / parameters["tempo"][0];
    const counterTimeValue = secondsPerBeat / 4;

    if (this.futureTickTime === null) {
      this.futureTickTime = counterTimeValue;
    }

    if (this.futureTickTime < currentTime + 0.1) {
      console.log("This is 16th note: " + this.counter);
      this.counter = this.counter + 1;

      this.futureTickTime = this.futureTickTime + counterTimeValue;

      this.port.postMessage({ name: "tick", time: +new Date() });

      if (this.counter > 16) {
        this.counter = 1;
      }
    }
    return true;
  }
}

//@ts-ignore
registerProcessor("clock-processor", ClockProcessor);
