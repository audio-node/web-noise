export class ClockProcessor extends AudioWorkletProcessor {
  value: number = 0;
  futureTickTime: number | null = null;
  nextTickTime: number | null = null;
  isTicking: boolean = false;

  static get parameterDescriptors() {
    return [
      {
        name: "bpm",
        defaultValue: 120,
        minValue: 0,
        maxValue: 500,
        automationRate: "a-rate",
      },
      {
        name: "inputGate",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "a-rate",
      },
    ];
  }

  process(_inputs: any, outputs: any, parameters: any) {
    const isTicking = parameters.inputGate[0] === 1;
    const gate = outputs[0];
    const trigger = outputs[1];
    const bpm = parameters["bpm"][0];
    if (bpm === 0) {
      return true;
    }
    const secondsPerBeat = 60 / bpm;

    if (!this.nextTickTime) {
      this.nextTickTime = currentTime + secondsPerBeat;
    }
    if (this.nextTickTime < currentTime + 0.1) {
      if (isTicking) {
        this.value = 1 - this.value;
        this.port.postMessage({ name: "tick", time: +new Date() });
        trigger.forEach((outputChannel: any) => {
          for (
            let sampleIndex = 0;
            sampleIndex < outputChannel.length;
            sampleIndex++
          ) {
            outputChannel[sampleIndex] = 0;
          }
          outputChannel[0] = 1;
        });
      }

      //
      this.nextTickTime = this.nextTickTime + secondsPerBeat;
    }

    if (isTicking) {
      gate.forEach((outputChannel: any) => {
        for (
          let sampleIndex = 0;
          sampleIndex < outputChannel.length;
          sampleIndex++
        ) {
          outputChannel[sampleIndex] = this.value;
        }
      });
    } else {
      this.value = 0;
    }
    return true;
  }
}

//@ts-ignore
registerProcessor("clock-processor", ClockProcessor);
