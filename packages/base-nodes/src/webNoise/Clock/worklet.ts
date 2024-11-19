export class ClockProcessor extends AudioWorkletProcessor {
  lastTickTime: number | null = null;
  isTicking: boolean = false;
  isTriggered: boolean = false;
  cursor: number = 0;

  phase = 0;
  amplitude = 1;

  static get parameterDescriptors() {
    return [
      {
        name: "bpm",
        minValue: 0,
        // maxValue: 500,
        automationRate: "a-rate",
      },
      {
        name: "duty",
        // defaultValue: 0.0001,
        minValue: 0,
        maxValue: 0.99,
        automationRate: "k-rate",
      },
    ];
  }

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ) {
    const trigger = outputs[0];
    const bpm = parameters["bpm"][0] || 1e-9;
    const freq = bpm / 60;

    const duty = parameters["duty"][0] || 0.5;

    const startDeg = 180.0 * duty;
    const digitizeThrd = Math.cos(startDeg * (Math.PI / 180));

    trigger.forEach((channel) => {
      for (let i = 0; i < channel.length; i++) {
        // Calculate the current time based on the global `currentTime` and the frame index.
        const currentTimeLocal = currentTime + i / sampleRate;

        // Generate the sine wave value.
        const clkRef = Math.sin(
          2 * Math.PI * freq * currentTimeLocal +
            (startDeg + this.phase) * (Math.PI / 180),
        );

        // Digitize to a square wave.
        channel[i] = clkRef >= digitizeThrd ? this.amplitude : 0;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("clock-processor", ClockProcessor);
} catch (e) {}
