import { PortType, type OutputPort, type WNAudioNode } from "@web-noise/core";
import type { ChannelSplitterData } from "./types";

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
        type: PortType.Audio,
      },
    },
    outputs: Array.from({ length: splitter.numberOfOutputs }).reduce<
      Record<string, OutputPort>
    >(
      (acc, item, index) => ({
        ...acc,
        [`output${index}`]: {
          port: [splitter, index],
          type: PortType.Audio,
        },
      }),
      {},
    ),
  };
};

export default channelSplitter;
