import { WNAudioNode } from "@web-noise/core";
import {
  SEQUENCE_MODES,
  DEFAULT_SEQUENCE_MODE,
  DEFAULT_STEP_VALUE,
} from "./constants";

//@ts-ignore
import stepSequencerWorkletProcessorUrl from "worklet:./worklet.ts";

const stepSequencerWorkletProcessor = new URL(
  stepSequencerWorkletProcessorUrl,
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

export const stepSequencerWorklet = async (
  audioContext: AudioContext,
): Promise<StepSequencer> => {
  await audioContext.audioWorklet.addModule(stepSequencerWorkletProcessor);
  const sequencer = new AudioWorkletNode(
    audioContext,
    "step-sequencer-processor",
    {
      numberOfOutputs: 3,
    },
  );

  const modeParameter = sequencer.parameters.get("mode")!;

  let tickHandler: TickHandler = () => {};

  sequencer.port.onmessage = ({ data }: MessageEvent) => {
    if (data.name === "tick") {
      tickHandler({ sequenceIndex: data.sequenceIndex });
    }
  };

  return {
    inputs: {
      trigger: {
        port: sequencer,
      },
      mode: {
        port: modeParameter,
      },
    },
    outputs: {
      midi: {
        port: [sequencer, 0],
      },
      gate: {
        port: [sequencer, 1],
      },
      trigger: {
        port: [sequencer, 2],
      },
    },
    setValues: ({ sequenceData: sequenceDataValue, mode: modeValue } = {}) => {
      if (typeof sequenceDataValue !== "undefined") {
        sequencer.port.postMessage({
          name: "sequence",
          value: sequenceDataValue.map(({ value, active }) =>
            active ? value : null,
          ),
        });
      }
      if (typeof modeValue !== "undefined") {
        modeParameter.setValueAtTime(modeValue, audioContext.currentTime);
      }
    },
    onTick: (fn) => (tickHandler = fn),
    resetCounter: () => {
      sequencer.port.postMessage({
        name: "resetCounter",
      });
    },
  };
};
