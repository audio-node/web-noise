import { Midi } from "@tonaljs/tonal";
import { WNAudioNode } from "@web-noise/core";
import {
  SEQUENCE_MODES,
  DEFAULT_SEQUENCE_MODE,
  DEFAULT_STEP_VALUE,
} from "./constants";

//@ts-ignore
import clockCounterProcessorUrl from "worklet:../clockCounter/worklet.ts";

const clockCounterProcessor = new URL(
  clockCounterProcessorUrl,
  import.meta.url,
);

type TickHandler = (args: { sequenceIndex: number }) => void;

export interface StepData {
  active: boolean;
  value: number;
}

export interface StepSequencerValues {
  sequenceData?: Array<StepData>;
  mode?: SEQUENCE_MODES;
}

export interface StepSequencer extends WNAudioNode {
  setValues: (values?: StepSequencerValues) => void;
  resetCounter: () => void;
  onTick: (fn: TickHandler) => void;
}

export { SEQUENCE_MODES, DEFAULT_SEQUENCE_MODE, DEFAULT_STEP_VALUE };

export const stepSequencer = async (
  audioContext: AudioContext,
): Promise<StepSequencer> => {
  await audioContext.audioWorklet.addModule(clockCounterProcessor);
  const clock = new AudioWorkletNode(audioContext, "clock-counter-processor");

  const freqSource = audioContext.createConstantSource();
  const midiSource = audioContext.createConstantSource();

  const trigger = audioContext.createConstantSource();
  trigger.offset.value = 0;

  const gate = audioContext.createConstantSource();
  gate.offset.value = 0;

  let mode = SEQUENCE_MODES.forward;
  let stepsNumber = 16;
  let sequenceData: StepSequencerValues["sequenceData"] = new Array(
    stepsNumber,
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
        midiSource.offset.value = midi;
        gate.offset.setValueAtTime(1, audioContext.currentTime);
        trigger.offset.setValueAtTime(1, audioContext.currentTime);
        trigger.offset.setValueAtTime(0, audioContext.currentTime + 1 / 100000);
      } else {
        gate.offset.setValueAtTime(0, audioContext.currentTime);
      }
      tickHandler({ sequenceIndex });
    }
  };

  freqSource.start();
  midiSource.start();
  trigger.start();
  gate.start();

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
      midi: {
        port: midiSource,
      },
      gate: {
        port: gate,
      },
      trigger: {
        port: trigger,
      },
    },
    destroy: () => {
      freqSource.stop();
      midiSource.stop();
      trigger.stop();
      gate.stop();
    },
    setValues: ({ sequenceData: sequenceDataValue, mode: modeValue } = {}) => {
      if (typeof sequenceDataValue !== "undefined") {
        sequenceData = sequenceDataValue;
      }
      if (typeof modeValue !== "undefined") {
        mode = modeValue;
      }
    },
    onTick: (fn) => (tickHandler = fn),
    resetCounter: () => {
      counter = 0;
      tickHandler({ sequenceIndex: counter });
    },
    freqSource,
    midiSource,
  };
};

