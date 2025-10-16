import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";

//@ts-ignore
import quantizerWorkletUrl from "worklet:./worklet.ts";

const quantizerWorklet = new URL(quantizerWorkletUrl, import.meta.url);

export const quantizer = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(quantizerWorklet);
  const workletNode = new AudioWorkletNode(audioContext, "quantizer-processor");

  const bitDepth = workletNode.parameters.get("bitDepth")!;

  return {
    inputs: {
      bitDepth: {
        port: bitDepth,
        type: PortType.Number,
        range: [bitDepth.minValue, bitDepth.maxValue],
        defaultValue: bitDepth.value,
      },
      input: {
        port: workletNode,
        type: PortType.Any,
      },
    },
    outputs: {
      output: {
        port: workletNode,
        type: PortType.Any,
      },
    },
  };
};

export default quantizer;
