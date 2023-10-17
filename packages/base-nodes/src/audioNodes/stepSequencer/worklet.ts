import { SEQUENCE_MODES, DEFAULT_SEQUENCE_MODE } from "./constants";

const TRIGGER_THRESHOLD = 0.5;

export class StepSequencerProcessor extends AudioWorkletProcessor {
  currentMidiNumber: number = 0;
  sequence: Array<number | null> = [];
  mode: SEQUENCE_MODES | null = null;
  counter: number = 0;
  isGateOpen: boolean = false;
  shouldExecuteTrigger: boolean = false;

  lastInputValue = 0;

  static get parameterDescriptors() {
    return [
      {
        name: "mode",
        defaultValue: DEFAULT_SEQUENCE_MODE,
        minValue: SEQUENCE_MODES.forward,
        maxValue: SEQUENCE_MODES.random,
        automationRate: "a-rate",
      },
    ];
  }

  constructor() {
    super();

    this.port.onmessage = ({ data }) => {
      if (data.name === "sequence") {
        this.sequence = data.value;
      }
      if (data.name === "resetCounter") {
        this.counter = 0;

        this.port.postMessage({
          name: "tick",
          sequenceIndex: this.counter,
        });
      }
    };
  }

  onTick() {
    const stepsCount = this.sequence.length;

    if (!stepsCount) {
      return;
    }

    if (this.mode === SEQUENCE_MODES.forward) {
      this.counter++;
    }
    if (this.mode === SEQUENCE_MODES.random) {
      this.counter = Math.round(Math.random() * stepsCount);
    }
    if (this.mode === SEQUENCE_MODES.reverse) {
      if (this.counter <= 0) {
        this.counter = stepsCount;
      }
      this.counter--;
    }

    const sequenceIndex = Math.abs(this.counter) % stepsCount;
    const midi = this.sequence[sequenceIndex];
    if (midi !== null) {
      this.currentMidiNumber = midi;
      this.isGateOpen = true;
      this.shouldExecuteTrigger = true;
    } else {
      this.isGateOpen = false;
    }

    this.port.postMessage({
      name: "tick",
      sequenceIndex: sequenceIndex,
    });
  }

  checkTrigger(value: number) {
    if (value > TRIGGER_THRESHOLD && this.lastInputValue < TRIGGER_THRESHOLD) {
      this.onTick();
    }
    this.lastInputValue = value;
  }

  checkChannel(channel: Float32Array) {
    channel.forEach((item) => this.checkTrigger(item));
  }

  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Array<any>>,
  ) {
    this.mode = parameters.mode[0];

    const input = inputs[0];
    input.forEach((channel) => this.checkChannel(channel));

    const [midiOutput, gateOutput, triggerOutput] = outputs;

    midiOutput.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = this.currentMidiNumber;
      }
    });

    gateOutput.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = +this.isGateOpen;
      }
    });

    triggerOutput.forEach((channel: any) => {
      for (let i = 0; i < channel.length; i++) {
        channel[i] = 0;
      }
    });
    if (this.shouldExecuteTrigger) {
      triggerOutput[0][0] = 1;
      this.shouldExecuteTrigger = false;
    }

    return true;
  }
}

try {
  //@ts-ignore
  registerProcessor("step-sequencer-processor", StepSequencerProcessor);
} catch (e) {}
