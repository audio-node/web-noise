import { WNAudioNode } from "@web-noise/core";
import { ConvolverValues, ConvolverData } from "./types";
import loadAudioBuffer from "../lib/loadAudioBuffer";
import { addBroadcastListener, useBroadcast } from "../lib/useBroadcast";

export interface Convolver extends WNAudioNode {
  setValues: (values?: ConvolverValues) => void;
  registerPort: (port: MessagePort) => void;
}

export const convolver = async (
  audioContext: AudioContext,
  data?: ConvolverData,
): Promise<Convolver> => {
  const { url } = data?.values || {};

  const convolverNode = audioContext.createConvolver();

  const channel = new MessageChannel();
  channel.port1.start();
  channel.port2.start();
  const broadcast = useBroadcast(channel.port1);

  const loadBuffer = async (url: string) => {
    const buffer = await loadAudioBuffer(url, audioContext);
    convolverNode.buffer = buffer;
    const event = {
      name: "track",
      data: {
        sampleRate: buffer.sampleRate,
        length: buffer.length,
        duration: buffer.duration,
        channelData: [buffer.getChannelData(0), buffer.getChannelData(1)],
      },
    };
    broadcast(event);
  };

  if (url) {
    await loadBuffer(url);
  }

  return {
    inputs: {
      input: {
        port: convolverNode,
      },
    },
    outputs: {
      output: {
        port: convolverNode,
      },
    },
    setValues: ({ url } = {}) => {
      if (typeof url !== "undefined") {
        loadBuffer(url);
      }
    },
    registerPort: (port) => {
      addBroadcastListener(channel.port2, port);
    },
  };
};

export default convolver;
