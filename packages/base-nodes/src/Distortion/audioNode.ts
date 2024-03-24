import { WNAudioNode } from "@web-noise/core";
import { addBroadcastListener } from "../lib/useBroadcast";
import { DistortionValues, DistortionData } from "./types";

//@ts-ignore
import distortionWorkletUrl from "worklet:./worklet.ts";
const distortionWorklet = new URL(distortionWorkletUrl, import.meta.url);

export interface Distortion extends WNAudioNode {
  registerPort: (port: MessagePort) => void;
}

export const distortion = async (
  audioContext: AudioContext,
): Promise<Distortion> => {
  await audioContext.audioWorklet.addModule(distortionWorklet);
  const curveGeneratorNode = new AudioWorkletNode(
    audioContext,
    "distortion-processor",
    {
      numberOfOutputs: 0,
    },
  );

  curveGeneratorNode.port.start();

  const waveShaper = audioContext.createWaveShaper();

  const channel = new MessageChannel();
  channel.port2.start();
  addBroadcastListener(curveGeneratorNode.port, channel.port1);

  channel.port2.addEventListener("message", ({ data }) => {
    waveShaper.curve = data;
  });

  return {
    inputs: {
      input: {
        port: waveShaper,
      },
      drive: {
        port: curveGeneratorNode,
      },
      type: {
        port: curveGeneratorNode.parameters.get('type')!,
      },
    },
    outputs: {
      output: {
        port: waveShaper,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(curveGeneratorNode.port, port);
    },
  };
};

export default distortion;
