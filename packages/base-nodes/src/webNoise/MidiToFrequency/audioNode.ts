import { PortType } from "@web-noise/core/constants";
import {
  MidiToFrequencyData,
  MidiToFrequency,
  MidiToFrequencyParameters,
} from "./types";

//@ts-ignore
import sciptNodeWorkletUrl from "worklet:../MathNode/worklet.ts";
const sciptNodeWorklet = new URL(sciptNodeWorkletUrl, import.meta.url);

export const midiToFrequency = async (
  audioContext: AudioContext,
  data?: MidiToFrequencyData,
): Promise<MidiToFrequency> => {
  await audioContext.audioWorklet.addModule(sciptNodeWorklet);
  const mathNode = new AudioWorkletNode(audioContext, "math-node-processor", {
    processorOptions: {
      expression: "(B ? B : 440) * Math.pow(2, (A - 69) / 12)",
    },
  });

  const midi = mathNode.parameters.get(MidiToFrequencyParameters.Midi)!;
  const tune = mathNode.parameters.get(MidiToFrequencyParameters.Tune)!;

  return {
    outputs: {
      out: {
        port: mathNode,
        type: PortType.Number,
      },
    },
    inputs: {
      midi: {
        port: midi,
        type: PortType.Number,
        range: [midi.minValue, midi.maxValue],
        defaultValue: midi.value,
      },
      tune: {
        port: tune,
        type: PortType.Number,
        range: [tune.minValue, tune.maxValue],
        defaultValue: 440,
      },
    },
  };
};

export default midiToFrequency;
