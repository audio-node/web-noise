import { WNAudioNode } from "@web-noise/core";

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

  const gainNode = audioContext.createGain();
  gainNode.gain.value = 1;

  phaseVocoderNode.connect(gainNode);

  return {
    inputs: {
      input: {
        port: phaseVocoderNode,
      },
      pitch: {
        port: phaseVocoderNode.parameters.get("pitchFactor")!,
      },
    },
    outputs: {
      output: {
        port: gainNode,
      },
    },
  };
};

export default phaseVocoder;
