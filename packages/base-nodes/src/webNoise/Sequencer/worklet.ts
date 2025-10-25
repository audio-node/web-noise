import { useBroadcast } from "../../lib/useBroadcast";
import { createUseGate } from "../../lib/useGate";
import createUseTrigger from "../../lib/useTrigger";
import {
  PortEvent,
  ResetEvent,
  Sequence,
  SequencerWorkletParameters,
  StepEndEvent,
  StepStartEvent,
} from "./types";

type Parameters = Record<SequencerWorkletParameters, Float32Array>;

export class SequencerProcessor extends AudioWorkletProcessor {
  broadcast = useBroadcast(this.port);
  useGate = createUseGate({ threshold: 0.5 });
  useTrigger = createUseTrigger({ threshold: 0.5 });

  sequence: Sequence = [];
  index = -1;

  static get parameterDescriptors() {
    return [
      {
        name: SequencerWorkletParameters.gate,
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
      {
        name: SequencerWorkletParameters.reset,
        defaultValue: 0,
        minValue: 0,
        maxValue: 1,
        automationRate: "k-rate",
      },
    ];
  }

  constructor() {
    super();
    this.port.start();

    this.port.addEventListener(
      "message",
      ({ data }: MessageEvent<PortEvent>) => {
        if (data.name === "SET_SEQUENCE") {
          this.sequence = data.data;
        }
      },
    );
  }

  shiftIndex() {
    this.index = Math.abs(++this.index) % this.sequence.length || 0;
  }

  resetIndex() {
    this.index = -1;
    this.broadcast<ResetEvent>({
      name: "RESET",
    });
  }

  process(
    _inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Parameters,
  ) {
    const gate = parameters[SequencerWorkletParameters.gate];
    const reset = parameters[SequencerWorkletParameters.reset];

    const [gateOutput, noteOutput, index] = outputs;

    this.useGate({
      channel: gate,
      onBeforeOpen: () => {
        this.shiftIndex();
        this.broadcast<StepStartEvent>({
          name: "STEP_START",
          data: this.index,
        });
      },
      onOpen: () => {},
      onClosed: () => {},
      onAfterClosed: () => {
        this.broadcast<StepEndEvent>({
          name: "STEP_END",
          data: this.index,
        });
      },
    });

    this.useTrigger({
      channel: reset,
      onTriggered: () => {
        this.resetIndex();
      },
    });

    gateOutput.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        const [state, note] = this.sequence[this.index] || [0, 0];
        outputChannel[sampleIndex] = state ? gate[0] : state;
        noteOutput[channelIndex][sampleIndex] = note;
      }
    });

    index.forEach((outputChannel, channelIndex) => {
      for (
        let sampleIndex = 0;
        sampleIndex < outputChannel.length;
        sampleIndex++
      ) {
        outputChannel[sampleIndex] = this.index;
      }
    });

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("sequencer-processor", SequencerProcessor);
} catch (e) {}
