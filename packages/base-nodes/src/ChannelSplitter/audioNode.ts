import { WNAudioNode } from "@web-noise/core";
import { ChannelSplitterValues, ChannelSplitterData } from "./types";

export interface ChannelSplitter extends WNAudioNode {}

export const channelSplitter = async (
  audioContext: AudioContext,
  data?: ChannelSplitterData,
): Promise<ChannelSplitter> => {
  const splitter = audioContext.createChannelSplitter();

  return {
    inputs: {
      input: {
        port: splitter,
      },
    },
    //@ts-ignore
    outputs: Array.from({ length: splitter.numberOfOutputs }).reduce(
      (acc, item, index) => ({
        //@ts-ignore
        ...acc,
        [`output${index}`]: {
          port: [splitter, index],
        },
      }),
      {},
    ),
  };
};

export default channelSplitter;
