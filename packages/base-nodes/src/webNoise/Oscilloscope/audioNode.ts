import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { OscilloscopeData, OscilloscopeParameters } from "./types";

//@ts-ignore
import oscilloscopeWorkletUrl from "worklet:./worklet.ts";

const oscilloscopeWorklet = new URL(oscilloscopeWorkletUrl, import.meta.url);

export type Ports = [MessagePort, MessagePort];

export interface Oscilloscope extends WNAudioNode {
  registerPorts: (ports: Ports) => void;
}

export const PORTS_AMOUNT = 2;

export const oscilloscope = async (
  audioContext: AudioContext,
  data?: OscilloscopeData,
): Promise<Oscilloscope> => {
  await audioContext.audioWorklet.addModule(oscilloscopeWorklet);

  const analyser = new AudioWorkletNode(
    audioContext,
    "oscilloscope-processor",
    {
      numberOfInputs: PORTS_AMOUNT,
    },
  );
  analyser.port.start();

  const fftSize = analyser.parameters.get(OscilloscopeParameters.FFTSize)!;

  return {
    inputs: {
      fftSize: {
        port: fftSize,
        type: PortType.Number,
        defaultValue: fftSize.value,
      },
      ...[null, null].reduce(
        (acc, port, index) => ({
          ...acc,
          [`input${index + 1}`]: {
            port: [analyser, index],
            type: PortType.Any,
          },
        }),
        {},
      ),
    },
    registerPorts: (ports) => {
      ports.forEach((port, index) => {
        addBroadcastListener(analyser.port, port, index);
      });
    },
  };
};

export default oscilloscope;
