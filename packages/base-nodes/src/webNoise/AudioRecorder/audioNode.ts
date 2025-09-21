import { RecorderData, Recorder } from "./types";

//@ts-ignore
import recorderWorkletUrl from "worklet:./worklet.ts";
const recorderWorklet = new URL(recorderWorkletUrl, import.meta.url);

//@ts-ignore
import { addBroadcastListener } from "../../lib/useBroadcast";
import createAudioTrack from "../AudioTrack/audioNode";

export const audioRecorder = async (
  audioContext: AudioContext,
  data?: RecorderData,
): Promise<Recorder> => {
  await audioContext.audioWorklet.addModule(recorderWorklet);
  const recorderNode = new AudioWorkletNode(
    audioContext,
    "audio-recorder-processor",
  );

  const audioTrack = await createAudioTrack(audioContext);
  if (data?.values?.src) {
    audioTrack.setValues({ src: data.values.src });
  }

  const record = recorderNode.parameters.get("record")!;
  const erase = recorderNode.parameters.get("erase")!;

  recorderNode.port.start();

  const channel = new MessageChannel();
  channel.port1.start();
  channel.port2.start();
  addBroadcastListener(recorderNode.port, channel.port1);
  channel.port2.addEventListener("message", (event) => {
    audioTrack.audioTrackWorklet.port.postMessage(event.data);
  });

  return {
    ...audioTrack,
    inputs: {
      input: {
        port: recorderNode,
      },
      record: {
        port: record,
      },
      erase: {
        port: erase,
      },
      play: audioTrack.inputs!.gate,
      // @TODO: iterate over predefined inputs
      restart: audioTrack.inputs!.restart,
      loop: audioTrack.inputs!.loop,
      start: audioTrack.inputs!.start,
      end: audioTrack.inputs!.end,
      detune: audioTrack.inputs!.detune,
      playbackRate: audioTrack.inputs!.playbackRate,
    },
    destroy: () => {
      recorderNode.port.close();
      audioTrack.destroy?.();
    },
    registerRecorderPort: (port) => {
      addBroadcastListener(recorderNode.port, port);
      return recorderNode.port;
    },
  };
};

export default audioRecorder;
