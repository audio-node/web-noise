import { WNAudioNode } from "@web-noise/core";

//@ts-ignore
import scaleWorkletUrl from "worklet:../Scale/worklet.ts";
//@ts-ignore
import reverbImpulseUrl from "blob-url:./impulse.wav";


const scaleWorklet = new URL(scaleWorkletUrl, import.meta.url);

const reverbImpulse = new URL(reverbImpulseUrl, import.meta.url);

const loadImpulse = async (audioContext: AudioContext) => {
  const response = await fetch(reverbImpulse);
  const buffer = await response.arrayBuffer();

  return audioContext.decodeAudioData(buffer);
};

export const reverb = async (
  audioContext: AudioContext,
): Promise<WNAudioNode> => {
  await audioContext.audioWorklet.addModule(scaleWorklet);
  const wetValue = new AudioWorkletNode(audioContext, "scale-processor", {
    numberOfInputs: 5,
  });

  const scaleMin = audioContext.createConstantSource();
  scaleMin.offset.value = 0;
  scaleMin.start();

  scaleMin.connect(wetValue, 0, 1);
  scaleMin.connect(wetValue, 0, 3);

  const dryValue = audioContext.createGain();
  dryValue.gain.value = 0;

  wetValue.connect(dryValue);

  const minusOne = audioContext.createConstantSource();
  minusOne.offset.value = -1;
  minusOne.start();

  minusOne.connect(dryValue);
  minusOne.connect(dryValue.gain);

  const convolver = audioContext.createConvolver();
  const impulseBuffer = await loadImpulse(audioContext);
  convolver.buffer = impulseBuffer ?? null;

  const wet = audioContext.createGain();
  wet.gain.value = 0;

  const dry = audioContext.createGain();
  dry.gain.value = 0;

  const inNode = audioContext.createGain();
  const outNode = audioContext.createGain();

  wetValue.connect(wet.gain);
  dryValue.connect(dry.gain);

  inNode.connect(dry);
  inNode.connect(convolver);
  convolver.connect(wet);

  dry.connect(outNode);
  wet.connect(outNode);

  return {
    inputs: {
      input: {
        port: inNode,
      },
      dryWet: {
        port: [wetValue, 0],
      },
    },
    outputs: {
      output: {
        port: outNode,
      },
    },
  };
};

export default reverb;
