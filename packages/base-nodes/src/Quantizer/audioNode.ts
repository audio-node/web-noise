import { WNAudioNode } from "@web-noise/core";

const quantizerWorklet = new URL("./worklet.ts", import.meta.url);

export const quantizer = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(quantizerWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "quantizer-processor"
  );

  return {
    inputs: {
      bitDepth: {
        port: workletNode.parameters.get('bitDepth')!,
      },
      input: {
        port: workletNode,
      },
    },
    outputs: {
      output: {
        port: workletNode,
      },
    },
  };
};

export default quantizer;
