import { WNAudioNode } from "@web-noise/core";
import { addBroadcastListener } from "../lib/useBroadcast";
import { SpectroscopeData } from "./types";

const spectroscopeWorklet = new URL("./worklet.ts", import.meta.url);

export interface Spectroscope extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}

export const spectroscope = async (
  audioContext: AudioContext,
  data?: SpectroscopeData
): Promise<Spectroscope> => {
  await audioContext.audioWorklet.addModule(spectroscopeWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "spectroscope-processor"
  );

  return {
    inputs: {
      fftSize: {
        port: workletNode.parameters.get("fftSize")!,
      },
      input: {
        port: workletNode,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(workletNode.port, port);
    },
  };
};

export default spectroscope;
