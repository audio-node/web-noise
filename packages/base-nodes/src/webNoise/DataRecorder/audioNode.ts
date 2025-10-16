import { PortType } from "@web-noise/core/constants";
import {
  DataRecorderData,
  DataRecorder,
  DataRecorderParameters,
} from "./types";

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

  const gate = dataRecorder.parameters.get(DataRecorderParameters.Gate)!;

  dataRecorder.port.start();

  return {
    inputs: {
      gate: {
        port: gate,
        type: PortType.Gate,
        range: [gate.minValue, gate.maxValue],
        defaultValue: gate.defaultValue,
      },
      "0": {
        port: [dataRecorder, 0],
        type: PortType.Any,
      },
      "1": {
        port: [dataRecorder, 1],
        type: PortType.Any,
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
