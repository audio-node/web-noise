import type { InputPort, WNAudioNode } from "@web-noise/core";
import type { ChannelMergerData } from "./types";

export interface ChannelMerger extends WNAudioNode {}

export const channelMerger = async (
  audioContext: AudioContext,
  data?: ChannelMergerData,
): Promise<ChannelMerger> => {
  const merger = audioContext.createChannelMerger();

  return {
    inputs: Array.from({ length: merger.numberOfInputs }).reduce<
      Record<string, InputPort>
    >(
      (acc, item, index) => ({
        ...acc,
        [`input${index}`]: {
          port: [merger, index],
        },
      }),
      {},
    ),
    outputs: {
      output: {
        port: merger,
      },
    },
  };
};

export default channelMerger;
