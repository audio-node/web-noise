import { Node } from "../ModuleContext";
import { Midi } from "@tonaljs/tonal";
//@ts-ignore
import clockCounterProcessor from "worklet-loader!./clockCounter/worklet.ts"; // eslint-disable-line

type TickHandler = (args: Record<string, any | never>) => void;

interface StepData {
  active: boolean;
  value: number;
}

enum SEQUENCE_MODES {
  forward,
  reverse,
  random,
}

interface StepSequencerValues {
  midi?: number;
  sequenceData?: Array<StepData>;
  mode?: SEQUENCE_MODES;
}

export interface StepSequencer extends Node {
  // gateSource: ConstantSourceNode; //TODO: to implement
  freqSource: ConstantSourceNode;
  ctrlSource: ConstantSourceNode;
  setValues: (values: StepSequencerValues) => void;
  onTick: (fn: TickHandler) => void;
}

const DEFAULT_STEP_VALUE: number = 36;
const DEFAULT_SEQUENCE_MODE: SEQUENCE_MODES = SEQUENCE_MODES.forward;

const stepSequencer = async (
  audioContext: AudioContext
): Promise<StepSequencer> => {
  await audioContext.audioWorklet.addModule(clockCounterProcessor);
  const clock = new AudioWorkletNode(audioContext, "clock-counter-processor");

  const freqSource = audioContext.createConstantSource();
  const ctrlSource = audioContext.createConstantSource();

  let mode = SEQUENCE_MODES.forward;
  let stepsNumber = 16;
  let sequenceData: StepSequencerValues["sequenceData"] = new Array(
    stepsNumber
  ).fill({ value: DEFAULT_STEP_VALUE, active: false });
  let counter = 0;
  let sequenceIndex = 0;

  let tickHandler: TickHandler = () => {};

  clock.port.onmessage = ({ data }: MessageEvent) => {
    if (data.name === "tick") {
      if (mode === SEQUENCE_MODES.forward) {
        counter++;
      }
      if (mode === SEQUENCE_MODES.random) {
        counter = Math.round(Math.random() * stepsNumber);
      }
      if (mode === SEQUENCE_MODES.reverse) {
        if (counter <= 0) {
          counter = stepsNumber;
        }
        counter--;
      }
      sequenceIndex = Math.abs(counter) % stepsNumber;
      if (sequenceData && sequenceData[sequenceIndex].active) {
        const midi = sequenceData[sequenceIndex].value;
        freqSource.offset.value = Midi.midiToFreq(midi);
        ctrlSource.offset.value = midi;
      }
      tickHandler({ sequenceIndex });
    }
  };

  freqSource.start();
  ctrlSource.start();

  return {
    inputs: {
      trigger: {
        port: clock,
      },
    },
    outputs: {
      freq: {
        port: freqSource,
      },
      ctrl: {
        port: ctrlSource,
      },
    },
    destroy: () => {
      freqSource.stop();
      ctrlSource.stop();
    },
    setValues: ({
      midi,
      sequenceData: sequenceDataValue,
      mode: modeValue,
    } = {}) => {
      if (typeof midi !== "undefined") {
        freqSource.offset.value = Midi.midiToFreq(midi);
        ctrlSource.offset.value = midi;
      }
      if (typeof sequenceDataValue !== "undefined") {
        sequenceData = sequenceDataValue;
      }
      if (typeof modeValue !== "undefined") {
        mode = modeValue;
      }
    },
    onTick: (fn) => (tickHandler = fn),
    freqSource,
    ctrlSource,
  };
};

export default stepSequencer;
