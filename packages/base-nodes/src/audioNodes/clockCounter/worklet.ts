const TRIGGER_THRESHOLD = 0.5;

export class ClockCounterProcessor extends AudioWorkletProcessor {
  lastInputValue = 0;

  onTick() {}

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
    _outputs: Float32Array[][],
    _parameters: Record<string, Array<any>>
  ) {
    const input = inputs[0];
    input.forEach((channel) => this.checkChannel(channel));
    return true;
  }
}

//@ts-ignore
registerProcessor("clock-counter-processor", ClockCounterProcessor);
