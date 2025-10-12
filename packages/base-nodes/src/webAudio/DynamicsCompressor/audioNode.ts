import { PortType, WNAudioNode } from "@web-noise/core";

export interface DynamicsCompressor extends WNAudioNode {}

export const dynamicsCompressor = async (
  audioContext: AudioContext,
): Promise<DynamicsCompressor> => {
  const compressor = audioContext.createDynamicsCompressor();

  return {
    inputs: {
      input: {
        port: compressor,
        type: PortType.Audio,
      },
      threshold: {
        port: compressor.threshold,
        type: PortType.Number,
        range: [compressor.threshold.minValue, compressor.threshold.maxValue],
        defaultValue: compressor.threshold.value,
      },
      knee: {
        port: compressor.knee,
        type: PortType.Number,
        range: [compressor.knee.minValue, compressor.knee.maxValue],
        defaultValue: compressor.knee.value,
      },
      ratio: {
        port: compressor.ratio,
        type: PortType.Number,
        range: [compressor.ratio.minValue, compressor.ratio.maxValue],
        defaultValue: compressor.ratio.value,
      },
      attack: {
        port: compressor.attack,
        type: PortType.Number,
        range: [compressor.attack.minValue, compressor.attack.maxValue],
        defaultValue: compressor.attack.value,
      },
      release: {
        port: compressor.release,
        type: PortType.Number,
        range: [compressor.release.minValue, compressor.release.maxValue],
        defaultValue: compressor.release.value,
      },
    },
    outputs: {
      output: {
        port: compressor,
        type: PortType.Audio,
      },
    },
  };
};

export default dynamicsCompressor;
