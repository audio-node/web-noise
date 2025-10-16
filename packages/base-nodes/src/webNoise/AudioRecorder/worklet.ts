import { useBroadcast } from "../../lib/useBroadcast";
import { createUseGate } from "../../lib/useGate";
import createUseTrigger from "../../lib/useTrigger";
import { RecorderParameters } from "./types";

const GATE_THRESHOLD = 0.5;

export class AudioRecorderProcessor extends AudioWorkletProcessor {
  useRecordingGate = createUseGate({ threshold: GATE_THRESHOLD });
  useEraseTrigger = createUseTrigger({ threshold: GATE_THRESHOLD });

  broadcast = useBroadcast(this.port);

  static get parameterDescriptors() {
    return [
      {
        name: RecorderParameters.Record,
        automationRate: "a-rate",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
      {
        name: RecorderParameters.Erase,
        automationRate: "a-rate",
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
      },
    ];
  }

  constructor() {
    super();
    this.port.start();
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ) {
    const input = inputs[0];

    const record = parameters[RecorderParameters.Record];
    const erase = parameters[RecorderParameters.Erase];

    this.useRecordingGate({
      channel: record,
      onBeforeOpen: () => {
        this.broadcast({ name: "START_RECORDING" });
      },
      onOpen: () => {
        if (!input.length) {
          return;
        }
        this.broadcast({ name: "data-chunk", data: input });
      },
      onClosed: () => {},
      onAfterClosed: () => {
        this.broadcast({ name: "STOP_RECORDING" });
      },
    });

    this.useEraseTrigger({
      channel: erase,
      onTriggered: () => {
        this.broadcast({
          name: "track",
          data: {
            sampleRate: sampleRate,
            length: 0,
            duration: 0,
            channelData: [new Float32Array(), new Float32Array()],
          },
        });
        this.broadcast({ name: "ERASE" });
      },
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("audio-recorder-processor", AudioRecorderProcessor);
} catch (e) {}
