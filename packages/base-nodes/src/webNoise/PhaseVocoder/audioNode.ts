import type { WNAudioNode } from "@web-noise/core";
import { PortType } from "@web-noise/core/constants";

//@ts-ignore
import phaseVocoderWorkletUrl from "worklet:phaze-vocoder";
const phaseVocoderWorklet = new URL(phaseVocoderWorkletUrl, import.meta.url);

export const phaseVocoder = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  try {
    await audioContext.audioWorklet.addModule(phaseVocoderWorklet);
  } catch (e) {
    console.warn("processor is already registered");
  }

  const phaseVocoderNode = new AudioWorkletNode(
    audioContext,
    "phase-vocoder-processor",
  );

  const pitch = phaseVocoderNode.parameters.get("pitchFactor")!;

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;

  phaseVocoderNode.connect(gainNode);

  return {
    inputs: {
      input: {
        port: phaseVocoderNode,
        type: PortType.Audio,
      },
      pitch: {
        port: pitch,
        type: PortType.Number,
        range: [pitch.minValue, pitch.maxValue],
        defaultValue: pitch.value,
      },
    },
    outputs: {
      output: {
        port: gainNode,
        type: PortType.Audio,
      },
    },
  };
};

export default phaseVocoder;
