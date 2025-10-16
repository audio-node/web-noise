import { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { addBroadcastListener } from "../../lib/useBroadcast";

//@ts-ignore
import valueMeterWorkletUrl from "worklet:./worklet.ts";

const valueMeterWorklet = new URL(valueMeterWorkletUrl, import.meta.url);

export interface ValueMeter extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}

export const valueMeter = async (
  audioContext: AudioContext,
): Promise<ValueMeter> => {
  await audioContext.audioWorklet.addModule(valueMeterWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "value-meter-processor",
  );

  return {
    inputs: {
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

export default valueMeter;
