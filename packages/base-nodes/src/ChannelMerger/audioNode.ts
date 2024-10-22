import { WNAudioNode } from "@web-noise/core";
import { ChannelMergerValues, ChannelMergerData } from "./types";

export interface ChannelMerger extends WNAudioNode {}

export const channelMerger = async (
  audioContext: AudioContext,
  data?: ChannelMergerData,
): Promise<ChannelMerger> => {
  const merger = audioContext.createChannelMerger();

  return {
    //@ts-ignore
    inputs: Array.from({ length: merger.numberOfInputs }).reduce(
      (acc, item, index) => ({
        //@ts-ignore
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
