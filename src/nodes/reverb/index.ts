/* A convolution reverb */
import { Node } from "../../ModuleContext";
// @ts-expect-error
import reverbImpulse from "./impulse.wav";

export interface ReverbValues {
  wetDry?: number;
}

export interface Reverb extends Node {
  convolver: ConvolverNode;
  wetGain: GainNode;
  dryGain: GainNode;
  setValues: (values?: ReverbValues) => void;
}

const loadImpulse = async (audioContext: AudioContext) => {
  const response = await fetch(reverbImpulse);
  const buffer = await response.arrayBuffer();

  return audioContext.decodeAudioData(buffer);
};

const reverb = async (audioContext: AudioContext): Promise<Reverb> => {

  const convolver = audioContext.createConvolver();
  const impulseBuffer = await loadImpulse(audioContext);
    convolver.buffer = impulseBuffer ?? null;

  const wet = audioContext.createGain();
  const dry = audioContext.createGain();
  const inNode = audioContext.createGain();
  const outNode = audioContext.createGain();

    dry.gain.setValueAtTime(0.5, audioContext.currentTime);
    wet.gain.setValueAtTime(0.5, audioContext.currentTime);

  inNode.connect(dry);
  inNode.connect(convolver);
  convolver.connect(wet);
  dry.connect(outNode);
  wet.connect(outNode);

  return {
    inputs: { in: { port: inNode } },
    outputs: { out: { port: outNode } },
    convolver,
    wetGain: wet,
    dryGain: dry,
    setValues: ({ wetDry } = {}) => {
      if (typeof wetDry !== "undefined") {
        wet.gain.setValueAtTime(wetDry, audioContext.currentTime);
        dry.gain.setValueAtTime(1 - wetDry, audioContext.currentTime);
      }
    },
  };
};

export default reverb;