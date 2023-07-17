import { WNAudioNode } from "@web-noise/core";
import { OscilloscopeData, AnalyserEventHandler } from "./types";

const oscilloscopeWorklet = new URL("./worklet.ts", import.meta.url);

export type Ports = [MessagePort, MessagePort];

export interface Oscilloscope extends WNAudioNode {
  input1Analyser: AudioWorkletNode;
  input2Analyser: AudioWorkletNode;
  getPorts: () => Ports;
}

const PORTS_AMOUNT = 2;

export const oscilloscope = async (
  audioContext: AudioContext,
  data?: OscilloscopeData
): Promise<Oscilloscope> => {
  await audioContext.audioWorklet.addModule(oscilloscopeWorklet);

  const analysers = Array.from({ length: PORTS_AMOUNT }, () => {
    const analyser = new AudioWorkletNode(
      audioContext,
      "oscilloscope-processor"
    );
    analyser.port.start();
    return analyser;
  }) as [AudioWorkletNode, AudioWorkletNode];

  return {
    inputs: {
      ...analysers.reduce(
        (acc, port, index) => ({ ...acc, [`input${index + 1}`]: { port } }),
        {}
      ),
    },
    input1Analyser: analysers[0],
    input2Analyser: analysers[1],
    getPorts: () => {
      const ports = analysers.map((analyser) => {
        const analyserChannel = new MessageChannel();
        analyserChannel.port2.start();
        const forwardMessage: AnalyserEventHandler = ({ data }) => {
          analyserChannel.port1.postMessage(data);
        };
        analyser.port.addEventListener("message", forwardMessage);
        return analyserChannel.port2;
      });

      return ports as Ports;
    },
  };
};

export default oscilloscope;
