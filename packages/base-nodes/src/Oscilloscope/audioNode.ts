import { WNAudioNode } from "@web-noise/core";
import { addBroadcastListener } from "../lib/useBroadcast";
import { OscilloscopeData } from "./types";

const oscilloscopeWorklet = new URL("./worklet.ts", import.meta.url);

export type Ports = [MessagePort, MessagePort];

export interface Oscilloscope extends WNAudioNode {
  registerPorts: (ports: Ports) => void;
}

export const PORTS_AMOUNT = 2;

export const oscilloscope = async (
  audioContext: AudioContext,
  data?: OscilloscopeData
): Promise<Oscilloscope> => {
  await audioContext.audioWorklet.addModule(oscilloscopeWorklet);

  const analyser = new AudioWorkletNode(
    audioContext,
    "oscilloscope-processor",
    {
      numberOfInputs: PORTS_AMOUNT,
    }
  );
  analyser.port.start();

  return {
    inputs: {
      fftSize: {
        port: analyser.parameters.get("fftSize")!,
      },
      ...[null, null].reduce(
        (acc, port, index) => ({
          ...acc,
          [`input${index + 1}`]: { port: [analyser, index] },
        }),
        {}
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
