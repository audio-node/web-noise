import { WNAudioNode } from "@web-noise/core";

const worklet = new URL("./worklet.ts", import.meta.url);

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
