import { Node } from "../ModuleContext";
import { Midi } from "@tonaljs/tonal";
//@ts-ignore
import clockCounterProcessor from "worklet-loader!./clockCounter/worklet.ts"; // eslint-disable-line

type TickHandler = (args: Record<string, never>) => void;

interface StepSequencerValues {
  midi: number;
}

export interface StepSequencer extends Node {
  // gateSource: ConstantSourceNode; //TODO: to implement
  freqSource: ConstantSourceNode;
  ctrlSource: ConstantSourceNode;
  setValues: (values: StepSequencerValues) => void;
  onTick: (fn: TickHandler) => void;
}

const stepSequencer = async (
  audioContext: AudioContext
): Promise<StepSequencer> => {
  await audioContext.audioWorklet.addModule(clockCounterProcessor);
  const clock = new AudioWorkletNode(audioContext, "clock-counter-processor");

  const freqSource = audioContext.createConstantSource();
  const ctrlSource = audioContext.createConstantSource();

  let tickHandler: TickHandler = () => {};

  clock.port.onmessage = ({ data }: MessageEvent) => {
    if (data.name === "tick") {
      tickHandler({});
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
    setValues: ({ midi }) => {
      freqSource.offset.value = Midi.midiToFreq(midi);
      ctrlSource.offset.value = midi;
    },
    onTick: (fn) => (tickHandler = fn),
    freqSource,
    ctrlSource,
  };
};

export default stepSequencer;
