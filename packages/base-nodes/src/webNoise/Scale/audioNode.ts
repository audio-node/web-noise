import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";

//@ts-ignore
import scaleWorkletUrl from "worklet:./worklet.ts";

const scaleWorklet = new URL(scaleWorkletUrl, import.meta.url);

export const scale = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(scaleWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "scale-processor", {
    numberOfInputs: 5,
  });

  return {
    inputs: {
      in: {
        port: [workletNode, 0],
        type: PortType.Any,
      },
      inMin: {
        port: [workletNode, 1],
        type: PortType.Number,
        defaultValue: -1,
      },
      inMax: {
        port: [workletNode, 2],
        type: PortType.Number,
        defaultValue: 1,
      },
      outMin: {
        port: [workletNode, 3],
        type: PortType.Number,
        defaultValue: -1,
      },
      outMax: {
        port: [workletNode, 4],
        type: PortType.Number,
        defaultValue: 1,
      },
    },
    outputs: {
      out: {
        port: workletNode,
        type: PortType.Any,
      },
    },
  };
};

export default scale;
