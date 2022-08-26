import { WNAudioNode } from "@web-noise/core";

export interface Destination extends WNAudioNode {
  destination: AudioDestinationNode;
}

export const destination = (audioContext: AudioContext): Destination => {
  const destination = audioContext.destination;
  return {
    inputs: {
      in: {
        port: destination,
      },
    },
    destination,
  };
};
