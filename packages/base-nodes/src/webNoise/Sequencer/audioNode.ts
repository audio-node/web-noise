import { addBroadcastListener } from "../../lib/useBroadcast";
import { SequencerValues, SequencerData, Sequencer } from "./types";

//@ts-ignore
import sequencerWorkletUrl from "worklet:./worklet.ts";
const sequencerWorklet = new URL(sequencerWorkletUrl, import.meta.url);

export const sequencer = async (
  audioContext: AudioContext,
  data?: SequencerData,
): Promise<Sequencer> => {
  await audioContext.audioWorklet.addModule(sequencerWorklet);
  const workletNode = new AudioWorkletNode(
    audioContext,
    "sequencer-processor",
    {
      numberOfOutputs: 3,
    },
  );

  return {
    inputs: {
      gate: {
        port: workletNode.parameters.get("gate")!,
      },
      reset: {
        port: workletNode.parameters.get("reset")!,
      },
    },
    outputs: {
      gate: {
        port: [workletNode, 0],
      },
      note: {
        port: [workletNode, 1],
      },
      index: {
        port: [workletNode, 2],
      },
    },
    registerPort: (port) => {
      addBroadcastListener(workletNode.port, port);
      return workletNode.port;
    },
    setValues: ({ sequence } = {}) => {
      if (typeof sequence !== "undefined") {
        workletNode.port.postMessage({ name: "SET_SEQUENCE", data: sequence });
      }
    },
  };
};

export default sequencer;
