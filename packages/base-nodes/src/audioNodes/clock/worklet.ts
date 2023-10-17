export class ClockProcessor extends AudioWorkletProcessor {
  nextTickTime: number | null = null;
  isTicking: boolean = false;
  isTriggered: boolean = false;
  cursor: number = 0;

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
        name: "duration",
        defaultValue: 0.0001,
        minValue: 0.0001,
        maxValue: 10,
        automationRate: "k-rate",
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

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const isTicking = parameters.inputGate[0] === 1;
    const trigger = outputs[0];
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
        this.port.postMessage({ name: "tick", time: +new Date() });
        this.isTriggered = true;
      }

      this.nextTickTime = this.nextTickTime + secondsPerBeat;
    }

    if (this.isTriggered) {
      const triggerLength = Math.ceil(parameters.duration[0] * sampleRate);
      trigger.forEach((outputChannel) => {
        for (let i = 0; i < outputChannel.length; i++) {
          this.cursor++;

          outputChannel[i] = 1;
          if (this.cursor >= triggerLength) {
            this.isTriggered = false;
            this.cursor = 0;
            break;
          }
        }
      });
    } else {
      this.cursor = 0;
    }
    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("clock-processor", ClockProcessor);
} catch (e) {}
