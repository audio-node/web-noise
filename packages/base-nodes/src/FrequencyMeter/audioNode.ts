import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import workletUrl from "worklet:./worklet.ts";

const worklet = new URL(workletUrl, import.meta.url);

const frequencyMeter = async (
  audioContext: AudioContext
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(worklet);
  const frequencyMeter = new AudioWorkletNode(
    audioContext,
    "frequency-meter-processor"
  );

  return {
    inputs: {
      input: {
        port: frequencyMeter,
      },
    },
    outputs: {
      frequency: {
        port: frequencyMeter,
      },
    },
  };
};

export default frequencyMeter;
