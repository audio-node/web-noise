import type { DataRecorderData, DataRecorder } from "./types";

//@ts-ignore
import dataRecorderWorkletUrl from "worklet:./worklet.ts";
import { addBroadcastListener } from "../../lib/useBroadcast";
const dataRecorderWorklet = new URL(dataRecorderWorkletUrl, import.meta.url);

export const dataRecorder = async (
  audioContext: AudioContext,
  data?: DataRecorderData,
): Promise<DataRecorder> => {
  await audioContext.audioWorklet.addModule(dataRecorderWorklet);
  const dataRecorder = new AudioWorkletNode(
    audioContext,
    "data-recorder-processor",
    {
      numberOfInputs: 2,
    },
  );

  const gate = dataRecorder.parameters.get("gate")!;

  dataRecorder.port.start();

  return {
    inputs: {
      gate: {
        port: gate,
      },
      "0": {
        port: [dataRecorder, 0],
      },
      "1": {
        port: [dataRecorder, 1],
      },
    },
    destroy: () => {
      dataRecorder.port.close();
    },
    registerPort: (port) => {
      addBroadcastListener(dataRecorder.port, port);
      return dataRecorder.port;
    },
  };
};

export default dataRecorder;
