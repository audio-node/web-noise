//@ts-ignore
import sequencerWorklet from "worklet-loader!./worklet.ts"; // eslint-disable-line
import { Node } from "../../ModuleContext";

export interface Sequencer extends Node {
  sequencer: AudioWorkletNode;
}

const sequencer = async (audioContext: AudioContext): Promise<Sequencer> => {
  await audioContext.audioWorklet.addModule(sequencerWorklet);
  const sequencer = new AudioWorkletNode(audioContext, "sequencer-processor");

  return {
    outputs: {
      out: {
        port: sequencer,
      },
    },
    sequencer,
  };
};

export default sequencer;
