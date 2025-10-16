import { PortType } from "@web-noise/core";
import { addBroadcastListener } from "../../lib/useBroadcast";
import { Distortion, DistortionParameters } from "./types";

//@ts-ignore
import distortionWorkletUrl from "worklet:./worklet.ts";
const distortionWorklet = new URL(distortionWorkletUrl, import.meta.url);

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

  const type = curveGeneratorNode.parameters.get(DistortionParameters.Type)!;

  return {
    inputs: {
      input: {
        port: waveShaper,
        type: PortType.Audio,
      },
      drive: {
        port: curveGeneratorNode,
        type: PortType.Number,
        range: [0, 2],
        defaultValue: 0,
      },
      type: {
        port: type,
        type: PortType.Number,
        range: [type.minValue, type.maxValue],
        defaultValue: type.defaultValue,
      },
    },
    outputs: {
      output: {
        port: waveShaper,
        type: PortType.Audio,
      },
    },
    registerPort: (port) => {
      addBroadcastListener(curveGeneratorNode.port, port);
    },
  };
};

export default distortion;
