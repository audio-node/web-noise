import { type InputPort, type WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
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
          type: PortType.Audio,
        },
      }),
      {},
    ),
    outputs: {
      output: {
        port: merger,
        type: PortType.Audio,
      },
    },
  };
};

export default channelMerger;
