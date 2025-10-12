import { PortType, WNAudioNode } from "@web-noise/core";

export const stereoPanner = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  const panner = audioContext.createStereoPanner();

  return {
    inputs: {
      input: {
        port: panner,
        type: PortType.Audio,
      },
      pan: {
        port: panner.pan,
        type: PortType.Number,
        range: [panner.pan.minValue, panner.pan.maxValue],
        defaultValue: panner.pan.value,
      },
    },
    outputs: {
      output: {
        port: panner,
        type: PortType.Audio,
      },
    },
  };
};

export default stereoPanner;
