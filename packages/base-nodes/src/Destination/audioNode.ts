import { Destination } from "./types";

const destination = (audioContext: AudioContext): Destination => {
  const destination = audioContext.destination;
  return {
    inputs: {
      in: {
        port: destination,
      },
    },
  };
};

export default destination;
