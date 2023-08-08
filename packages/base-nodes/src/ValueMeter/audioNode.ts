import { WNAudioNode } from "@web-noise/core";
import { addBroadcastListener } from "../lib/useBroadcast";

const valueMeterWorklet = new URL("./worklet.ts", import.meta.url);

export interface ValueMeter extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}

export const valueMeter = async (
  audioContext: AudioContext
): Promise<ValueMeter> => {
  await audioContext.audioWorklet.addModule(valueMeterWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "value-meter-processor"
  );

  return {
    inputs: {
      input: {
        port: workletNode,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(workletNode.port, port);
    },
  };
};

export default valueMeter;
