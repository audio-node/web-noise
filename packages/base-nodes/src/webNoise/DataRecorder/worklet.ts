import { useBroadcast } from "../../lib/useBroadcast";
import { createUseGate } from "../../lib/useGate";
import type { RecorderData, PortEvent } from "./types";
import { DataRecorderParameters } from "./types";

const GATE_THRESHOLD = 0.5;

/* should be extracted to lib */

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

  broadcast = useBroadcast(this.port);

  static get parameterDescriptors() {
    return [
      {
        name: DataRecorderParameters.Gate,
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

  constructor() {
    super();
    this.port.start();
  }

  emitEvent(event: PortEvent) {
    this.broadcast<PortEvent>(event);
  }

  emitProgressEvent() {
    if (!this.data) {
      return;
    }
    const duration = currentTime - this.data.start;
    this.emitEvent({
      name: "progress",
      data: duration,
    });
  }

  process(
    inputs: Float32Array[][],
    _outputs: Float32Array[][],
    parameters: Record<DataRecorderParameters, Float32Array>,
  ) {
    const gate = parameters[DataRecorderParameters.Gate];

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
