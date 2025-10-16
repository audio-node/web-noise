import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { SpectroscopeData } from "./types";

//@ts-ignore
import spectroscopeWorkletUrl from "worklet:./worklet.ts";

const spectroscopeWorklet = new URL(spectroscopeWorkletUrl, import.meta.url);

export interface Spectroscope extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}

export const spectroscope = async (
  audioContext: AudioContext,
  data?: SpectroscopeData,
): Promise<Spectroscope> => {
  await audioContext.audioWorklet.addModule(spectroscopeWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "spectroscope-processor",
  );

  const fftSize = workletNode.parameters.get("fftSize")!;

  return {
    inputs: {
      fftSize: {
        port: fftSize,
        type: PortType.Number,
        range: [fftSize.minValue, fftSize.maxValue],
        defaultValue: 2048,
      },
      input: {
        port: workletNode,
        type: PortType.Any,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(workletNode.port, port);
    },
  };
};

export default spectroscope;
