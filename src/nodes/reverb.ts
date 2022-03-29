import { Node } from "../ModuleContext";

export interface Reverb extends Node {
  convolver: ConvolverNode;
  wetGain: GainNode;
  dryGain: GainNode;
}

const reverb = (audioContext: AudioContext) => {
  const convolver = audioContext.createConvolver();
  const wet = audioContext.createGain();
  const dry = audioContext.createGain();
  const inNode = audioContext.createGain();
  const outNode = audioContext.createGain();

  inNode.connect(dry);
  inNode.connect(convolver);
  convolver.connect(wet);
  dry.connect(outNode);
  wet.connect(outNode);

  return {
    convolver,
    wetGain: wet,
    dryGain: dry,
    inputs: { in: { port: inNode } },
    outputs: { out: { port: outNode } },
  };
};

export default reverb;
