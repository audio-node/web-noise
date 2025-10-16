import { PortType } from "@web-noise/core/constants";
import { Destination } from "./types";

const destination = (audioContext: AudioContext): Destination => {
  const destination = audioContext.destination;

  return {
    inputs: {
      in: {
        port: destination,
        type: PortType.Audio,
      },
    },
  };
};

export default destination;
