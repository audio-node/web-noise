import { type WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";
import { ConvolverValues, ConvolverData } from "./types";
import loadAudioBuffer from "../../lib/loadAudioBuffer";
import { addBroadcastListener, useBroadcast } from "../../lib/useBroadcast";

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
    try {
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
    } catch (error) {
      // @TODO: should broadcast an error event
      const event = {
        name: "track",
        data: {
          sampleRate: audioContext.sampleRate,
          length: 0,
          duration: 0,
          channelData: [new Float32Array(), new Float32Array()],
        },
      };
      broadcast(event);
    }
  };

  if (url) {
    await loadBuffer(url);
  }

  return {
    inputs: {
      input: {
        port: convolverNode,
        type: PortType.Audio,
      },
    },
    outputs: {
      output: {
        port: convolverNode,
        type: PortType.Audio,
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
