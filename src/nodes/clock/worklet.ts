export class ClockProcessor extends AudioWorkletProcessor {
  counter: number = 1;
  futureTickTime: number | null = null;
  isTicking: boolean = false;
  constructor() {
    super();
    this.port.onmessage = (e) => {
      switch (e.data.name) {
        case "start":
          this.isTicking = true;
          break;
        case "stop":
          this.isTicking = false;
          break;
      }
    };
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
    if (!this.isTicking) {
      return true;
    }
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
