import { WNAudioNode } from "@web-noise/core";

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
      },
      inMin: {
        port: [workletNode, 1],
      },
      inMax: {
        port: [workletNode, 2],
      },
      outMin: {
        port: [workletNode, 3],
      },
      outMax: {
        port: [workletNode, 4],
      },
    },
    outputs: {
      out: {
        port: workletNode,
      },
    },
  };
};

export default scale;
