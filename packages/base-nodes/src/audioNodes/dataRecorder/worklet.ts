import type { RecorderData, PortEvent } from "./types";

const GATE_THRESHOLD = 0.5;

/* should be extracted to lib */
const createUseGate = ({ threshold = 0.5 }) => {
  let isGateOpen = false;
  return ({
    channel,
    onBeforeOpen,
    onOpen,
    onAfterClosed,
    onClosed,
  }: {
    channel: Float32Array;
    onOpen?: () => void;
    onClosed?: () => void;
    onBeforeOpen?: () => void;
    onAfterClosed?: () => void;
  }) => {
    for (let i = 0; i < channel.length; i++) {
      const value = channel[i];
      if (value >= threshold && !isGateOpen) {
        onBeforeOpen?.();
        isGateOpen = true;
      }
      if (value < threshold && isGateOpen) {
        onAfterClosed?.();
        isGateOpen = false;
      }
    }
    if (isGateOpen) {
      onOpen?.();
    } else {
      onClosed?.();
    }
  };
};

const duratinToTime = (duration: number) => {
  const m = Math.floor(duration / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(duration % 60)
    .toString()
    .padStart(2, "0");
  const ms = Math.floor((duration % 1) * 100)
    .toString()
    .padStart(2, "0");

  return `${m}:${s}.${ms}`;
};

const float32Concat = (first: Float32Array, second: Float32Array) => {
  var firstLength = first.length,
    result = new Float32Array(firstLength + second.length);

  result.set(first);
  result.set(second, firstLength);

  return result;
};
/* / should be extracted to lib */

export class DataRecorderProcessor extends AudioWorkletProcessor {
  data: RecorderData | null = null;

  useGate = createUseGate({ threshold: GATE_THRESHOLD });

  static get parameterDescriptors() {
    return [
      {
        name: "gate",
        automationRate: "a-rate",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
    ];
  }

  generateData = (): RecorderData => ({
    sampleRate: sampleRate,
    length: 0,
    start: currentTime,
    startTimestamp: +new Date(),
    startFrame: currentFrame,
    end: 0,
    endTimestamp: 0,
    endFrame: 0,
    channels: [new Float32Array(), new Float32Array()],
  });

  emitEvent(event: PortEvent) {
    this.port.postMessage(event);
  }

  emitProgressEvent() {
    if (!this.data) {
      return;
    }
    const duration = currentTime - this.data.start;
    this.emitEvent({
      name: "progress",
      data: duration,
      time: duratinToTime(duration),
    });
  }

  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: {
      gate: Float32Array;
    },
  ) {
    const { gate } = parameters;

    this.useGate({
      channel: gate,
      onBeforeOpen: () => {
        this.data = this.generateData();
        this.emitEvent({
          name: "start",
        });
      },
      onOpen: () => {
        this.emitProgressEvent();
        if (!this.data) {
          return;
        }
        for (let i = 0; i < this.data.channels.length; i++) {
          const inputChannel = inputs[i]?.[0] ?? new Float32Array(128); //@TODO: move this 128 somewhere
          this.data.channels[i] = float32Concat(
            this.data.channels[i],
            inputChannel,
          );
        }
      },
      onClosed: () => {},
      onAfterClosed: () => {
        if (!this.data) {
          return;
        }
        this.data.end = currentTime;
        this.data.endTimestamp = +new Date();
        this.data.endFrame = currentFrame;
        this.emitEvent({
          name: "stop",
          data: this.data,
        });
      },
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("data-recorder-processor", DataRecorderProcessor);
} catch (e) {}
